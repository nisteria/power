// WebSocket Service - Real-time
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 4001 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    handleMessage(ws, message);
  });
});

function handleMessage(ws: WebSocket, message: any) {
  switch (message.type) {
    case 'subscribe':
      ws.subscriptions = message.channels;
      break;
    case 'device:update':
      broadcast('device:update', message.data);
      break;
  }
}

function broadcast(type: string, data: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, data }));
    }
  });
}