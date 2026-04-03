const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4177;
const ROOT = path.resolve(__dirname, '..');

const files = {
  activity: path.join(ROOT, 'POWER_AGENT_ACTIVITY.md'),
  projectStatus: path.join(ROOT, 'PROJECT_STATUS.md'),
  projectTodo: path.join(ROOT, 'PROJECT_TODO.md'),
  roadmap: path.join(ROOT, 'ROADMAP.md')
};

function readTextSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function getFileStatSafe(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

function extractTimestampParts(title) {
  // Supports:
  // - 2026-03-12 13:54:23
  // - [2026-03-12 14:44 Europe/Warsaw]
  // - [2026-03-12 14:44:52 +01:00]
  const m = title.match(/\[?(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})(?::(\d{2}))?/);
  if (!m) return null;
  return {
    date: m[1],
    hhmm: m[2],
    ss: m[3] || '00'
  };
}

function parseActivityEntries(md) {
  const lines = md.split(/\r?\n/);
  const entries = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const title = line.replace(/^##\s*/, '').trim();
      const isTimestampHeading = !!extractTimestampParts(title);

      if (current) entries.push(current);
      current = isTimestampHeading ? { title, bullets: [] } : null;
    } else if (line.trim().startsWith('- ') && current) {
      current.bullets.push(line.trim().slice(2));
    }
  }

  if (current) entries.push(current);
  return entries;
}

function parseIsoFromTitle(title) {
  const parts = extractTimestampParts(title);
  if (!parts) return null;
  const iso = `${parts.date}T${parts.hhmm}:${parts.ss}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function computeAgentHealth(entries) {
  const latest = entries[entries.length - 1] || null;
  const latestDate = latest ? parseIsoFromTitle(latest.title) : null;
  const now = new Date();

  let active = false;
  let minutesSince = null;

  if (latestDate) {
    minutesSince = Math.floor((now - latestDate) / 60000);
    active = minutesSince <= 10;
  }

  return {
    active,
    minutesSince,
    latestEntryTitle: latest ? latest.title : null
  };
}

function getTrafficFromEntry(entry) {
  if (!entry) return { sent: null, received: null };

  const sent = entry.bullets.find((b) => b.toLowerCase().startsWith('ai->')) || null;
  const received = entry.bullets.find((b) => b.toLowerCase().startsWith('ai<-')) || null;

  return {
    sent: sent ? sent.replace(/^ai->\s*/i, '') : null,
    received: received ? received.replace(/^ai<-\s*/i, '') : null
  };
}

function parseTodos(projectTodo) {
  const lines = projectTodo.split(/\r?\n/).map((l) => l.trim());
  const done = [];
  const open = [];

  for (const line of lines) {
    if (/^-\s*\[x\]/i.test(line)) done.push(line.replace(/^-\s*\[x\]\s*/i, ''));
    if (/^-\s*\[\s\]/i.test(line)) open.push(line.replace(/^-\s*\[\s\]\s*/i, ''));
  }

  return {
    done,
    open,
    total: done.length + open.length
  };
}

function parseDocMentionsFromText(text) {
  const set = new Set();
  const direct = text.match(/\b[A-Z0-9_\-]+\.md\b/gi) || [];
  const inline = [...text.matchAll(/\(([^)]+\.md)\)/gi)].map((m) => m[1]);
  [...direct, ...inline].forEach((m) => set.add(m.replace(/`/g, '')));
  return Array.from(set).sort();
}

function inferRecentTodoChanges(entries) {
  const hints = [];
  for (const e of entries.slice(-20).reverse()) {
    const t = (e.title || '').toLowerCase();
    const b = (e.bullets || []).join(' ').toLowerCase();
    const hay = `${t} ${b}`;
    if (/(todo\.md|project_todo|todo)/.test(hay) && /(erstellt|angelegt|ergänzt|ergaenzt|aktualisiert|abgehakt|erledigt)/.test(hay)) {
      hints.push(e.title);
    }
  }
  return hints.slice(0, 6);
}

function buildSnapshot() {
  const activity = readTextSafe(files.activity);
  const projectStatus = readTextSafe(files.projectStatus);
  const projectTodo = readTextSafe(files.projectTodo);
  const roadmap = readTextSafe(files.roadmap);

  const entries = parseActivityEntries(activity);
  const health = computeAgentHealth(entries);
  const activityStat = getFileStatSafe(files.activity);
  const latestEntry = entries[entries.length - 1] || null;
  const traffic = getTrafficFromEntry(latestEntry);
  const todo = parseTodos(projectTodo);
  const completionRate = todo.total ? Math.round((todo.done.length / todo.total) * 100) : 0;
  const mentionedDocs = parseDocMentionsFromText(`${projectTodo}\n${projectStatus}\n${roadmap}`);
  const recentTodoChanges = inferRecentTodoChanges(entries);

  return {
    now: new Date().toISOString(),
    agent: {
      active: health.active,
      minutesSinceLastEntry: health.minutesSince,
      latestEntryTitle: health.latestEntryTitle,
      activityFileLastModified: activityStat ? activityStat.mtime.toISOString() : null
    },
    traffic,
    feed: {
      activityEntries: entries.slice(-20)
    },
    todos: {
      completed: todo.done,
      open: todo.open,
      completedCount: todo.done.length,
      openCount: todo.open.length,
      totalCount: todo.total,
      completionRate,
      recentChanges: recentTodoChanges
    },
    docs: {
      projectStatus,
      projectTodo,
      roadmap,
      mentionedDocs
    }
  };
}

function sendJson(res, obj) {
  const data = JSON.stringify(obj, null, 2);
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(data);
}

function serveStatic(req, res) {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, 'public', url);

  if (!filePath.startsWith(path.join(__dirname, 'public'))) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not Found');
    }

    const ext = path.extname(filePath);
    const type = ext === '.html' ? 'text/html; charset=utf-8'
      : ext === '.css' ? 'text/css; charset=utf-8'
      : ext === '.js' ? 'application/javascript; charset=utf-8'
      : 'text/plain; charset=utf-8';

    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/status')) {
    return sendJson(res, buildSnapshot());
  }

  if (req.url.startsWith('/api/stream')) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });

    const push = () => {
      res.write(`data: ${JSON.stringify(buildSnapshot())}\n\n`);
    };

    push();
    const timer = setInterval(push, 2000);

    req.on('close', () => {
      clearInterval(timer);
      res.end();
    });
    return;
  }

  if (req.url.startsWith('/docs/')) {
    const rawName = decodeURIComponent(req.url.replace('/docs/', '').split('?')[0]);
    if (!/^[\w.-]+\.md$/i.test(rawName)) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Invalid document name');
    }
    const docPath = path.join(ROOT, rawName);
    if (!docPath.startsWith(ROOT)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Forbidden');
    }
    fs.readFile(docPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Document not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Power Agent Dashboard running at http://localhost:${PORT}`);
});
