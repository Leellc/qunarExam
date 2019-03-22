const request = require('request-promise')
const cheerio = require('cheerio')
const Article = require('./article')

const get = (url) => {
  return new Promise(resolve => {
    request({
      method: 'GET',
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
      }
    }).then(body => {
      const $ = cheerio.load(body);
      const title = $('.note-header h1').text();
      const text = $('#link-report').text().replace(/\s/g, '')
      const wordCount = text.length
      const englishWordCount = text.match(/[a-zA-Z]/g) ? text.match(/[a-zA-Z]/g).length : 0;
      const chineseWordCount = text.match(/[\u4e00-\u9fa5]/g).length;
      const punctuationCount = text.match(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]|[,/.?#@$%&*()'"<>:{}\[\]\-+]/g).length;
      const info = {
        url,
        title,
        text,
        wordCount,
        englishWordCount,
        chineseWordCount,
        punctuationCount
      };
      const article = new Article(info)
      article
        .save()
        .then(() => {
          Article.find((e, articles) => {
            if (e) {
              return console.log('出错了',e);
            }
            console.log(articles);
            resolve(articles);
          })
        })
    }).catch(e => {
      console.log('出错了', e);
    });
  })
}

exports.get = get