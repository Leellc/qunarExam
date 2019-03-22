let express = require('express');
let request = require('request-promise')
let app = express();

app.use(express.static(__dirname + '/public'));


app.get('/api/flightInfo', (req, res) => {
  request({
    method: 'GET',
    url: `https://flight.qunar.com/touch/api/domestic/wbdflightlist`,
    headers:{
      'f8427e': '1f0c13a474369428d2b7f2b8227668f9',
      'cookie':'QN99=1786; QN300=s%3Dbaidu; QN1=eIQjmlyLYWO992dnVukcAg==; QunarGlobal=10.86.213.149_-2335a68e_1698067470a_7899|1552638307359; QN205=s%3Dbaidu; QN277=s%3Dbaidu; QN267=466581815d9659556; csrfToken=W3DAL83ag1PBp2JSmiDEXLkSN3RvC4b4; QN163=0; QN269=D891F31146FB11E982EAFA163EA3187D; QN48=tc_c7276ca03eb607a1_1698074763f_e395; _i=VInJO1UR-GYVUttxZuq5QQs4Xxcq; fid=1de4b9a0-0540-4b7c-bf94-8fc9db31b531; QN271=392bec27-9c54-420f-84da-0170b59dbc9c'
    },
    qs: {
      departureCity: '成都',
      arrivalCity: '北京',
      departureDate: '2019-03-19'
    }
  }).then(response => {
    const obj = JSON.parse(response);
    console.log(obj);
    const data = {
      trendPrice: [
        {
          "price": "758",
          "date": "03-12",
          "day": "周二",
          "index": 2
        },
        {
          "price": "820",
          "date": "03-13",
          "day": "周三",
          "index": 3
        },
        {
          "price": "744",
          "date": "03-14",
          "day": "周四",
          "index": 4
        },
        {
          "price": "810",
          "date": "03-15",
          "day": "周五",
          "index": 5
        },
        {
          "price": "758",
          "date": "03-16",
          "day": "周六",
          "index": 6
        }
      ]
    }
    data.flightInfo = obj.data.flights.filter(item => !item.hasOwnProperty('binfo1'))
    res.json(data)
  })
  
});


app.listen(3001, () => {
  console.log('App listening on port 3001!');
});
