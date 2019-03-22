let moongose = require('mongoose')

let Schema = moongose.Schema

let commentSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  wordCount: {
    type: Number,
    required: true
  },
  chineseWordCount: {
    type: Number,
    required: true
  },
  englishWordCount: {
    type: Number,
    required: true
  },
  punctuationCount: {
    type: Number,
    required: true
  }
})

moongose
  .connect('mongodb://localhost/exam3')
  .then(() => {
    console.log('连接数据库exam3成功');
  }).catch(e => {
    return console.error('连接数据库exam3失败',e);
  })

module.exports = moongose.model('Article', new Schema(commentSchema))

