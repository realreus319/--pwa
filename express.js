const express = require('express')
const mqtt = require('mqtt')
const app = express()

const WebSocket = require('ws');






// 创建MQTT客户端
const client = mqtt.connect('wss://chaoxi.live:8084/mqtt', {
	username: 'chaoxi',
	password: 'ilove4dbim',
	clientId: `web_${Math.random().toString(16).slice(3)}`
})

app.get('/', function (req, res) {
	res.send('Hello World!');
	console.log("hh,你这次请求在访问我哦。。。")
})


app.get('/example', (req, res) => {
	res.send('Hello World!');
});




// 处理HTTP请求
app.get('/api', (req, res) => {
	// 将请求数据转换为MQTT消息
	// const messanoge = {
	// 	method: req.method,
	// 	url: req.url,
	// 	headers: req.headers,
	// 	body: req.body
	// }


	//获取当前时间戳
	const timestamp = Date.parse(new Date());
	const mqmessage = {"cardupdate": "true","time": timestamp} 

	client.publish('1/1/1/service/1', JSON.stringify(mqmessage))
	res.send('收到更新请求，发送到mqtt' + JSON.stringify(mqmessage))
	console.log("api被请求了")
})



// //websocket部分
// const wss = new WebSocket.Server({ port: 7777 });
// //   ws://localhost:7777

// wss.on('connection', (ws) => {
// 	console.log('客户端已连接');

// 	ws.on('message', (messagews) => {
// 		console.log(`收到消息：${messagews}`);

// 		if (message === 'update') {
// 			// 向连接的客户端发送信息
// 			wss.clients.forEach((client) => {
// 				if (client.readyState === WebSocket.OPEN) {
// 					client.send('更新信息');
// 				}
// 			});
// 		}
// 	});

// 	ws.on('close', () => {
// 		console.log('客户端已断开连接');
// 	});
// });







app.listen(3000, () => {
	console.log('Server started on port 3000')
})


