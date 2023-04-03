// 1. 导入express框架
const express = require('express')
// 2. 创建服务器实例对象
const app = express()


const Joi = require('joi');

app.use(express.json());
const books = [
    { id: 1, name: 'book1'},
    { id: 2, name: 'book2'},
    { id: 3, name: 'book3'},
];
app.get('/api', (req, res) => {
    res.end('Hello World!');
});
//获取所有书籍
app.get('/api/books', (req, res) => {
    res.json(books).end();
});
//获取特定id的书籍
app.get('/api/books/:id', (req, res) => {
    let book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).json({msg: 'The book with the given ID not find.'});
    res.json(book).end();
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// 3. 绑定事件
app.get('/',function(req,res){
  console.log("hh,你这次请求在访问我哦。。。")
})
// 4. 监听端口，绑定事件
app.listen(9999,function(){
  console.log("服务器启动了！！！")
})