const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7777 });
//   ws://localhost:7777

wss.on('connection', (ws) => {
  console.log('客户端已连接');

  ws.on('message', (message) => {
    console.log(`收到消息：${message}`);

    if (message === 'update') {
      // 向连接的客户端发送信息
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('更新信息');
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('客户端已断开连接');
  });
});
