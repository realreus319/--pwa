const express = require('express')
const mqtt = require('mqtt')
const app = express()

// 创建MQTT客户端
const client = mqtt.connect('mqtt://frp.thubim.cn', {
  username: 'd:cloud',
  password: 'ilove4dbim'
})

// 处理HTTP请求
app.get('/api', (req, res) => {
  // 将请求数据转换为MQTT消息
  const message = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  }
  client.publish('cloud/yf-crane/cloud/+/event/property', JSON.stringify(message))
  res.send('Message sent to MQTT broker')
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
