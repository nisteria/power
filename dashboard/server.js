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

function parseActivityEntries(md) {
  const lines = md.split(/\r?\n/);
  const entries = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current) entries.push(current);
      current = { title: line.replace(/^##\s*/, ''), bullets: [] };
    } else if (line.trim().startsWith('- ') && current) {
      current.bullets.push(line.trim().slice(2));
    }
  }
  if (current) entries.push(current);
  return entries;
}

function parseIsoFromTitle(title) {
  const m = title.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/);
  if (!m) return null;
  const iso = `${m[1]}T${m[2]}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function computeAgentHealth(activityMd) {
  const entries = parseActivityEntries(activityMd);
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
    latestEntryTitle: latest ? latest.title : null,
    entries
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
    const activity = readTextSafe(files.activity);
    const projectStatus = readTextSafe(files.projectStatus);
    const projectTodo = readTextSafe(files.projectTodo);
    const roadmap = readTextSafe(files.roadmap);

    const health = computeAgentHealth(activity);
    const activityStat = getFileStatSafe(files.activity);

    return sendJson(res, {
      now: new Date().toISOString(),
      agent: {
        active: health.active,
        minutesSinceLastEntry: health.minutesSince,
        latestEntryTitle: health.latestEntryTitle,
        activityFileLastModified: activityStat ? activityStat.mtime.toISOString() : null
      },
      feed: {
        activityEntries: health.entries.slice(-20)
      },
      docs: {
        projectStatus,
        projectTodo,
        roadmap
      }
    });
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Power Agent Dashboard running at http://localhost:${PORT}`);
});
