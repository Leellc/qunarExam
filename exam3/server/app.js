const express = require('express')
const articleInfo = require('./articleInfo')
const Article = require('./article')


const app = express()

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  //允许请求资源的方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/article', (req, res) => {
  const url = req.query.url;
  articleInfo
    .get(url)
    .then(info => {
      res.json(info)
    })
    .catch(e => {
      res.send('出错了~')
    })
});

app.get('/find', (req, res) => {
  Article.find((e, response) => {
    res.json(response)
  })
})
  


app.listen(3001, () => {
  console.log('App listening on port 3001!');
});
