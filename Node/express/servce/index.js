const fs = require('fs');
const express = require('express'); //引入express
const app = express();  //生成应用实例

app.get('/favicon.ico', function (request, response) {
  // 一句 status(200) 代替 writeHead(200); end();
  response.status(200)
  return;
})

let drinkArr = ['1.外卖', '2.kfc', '3.麦麦','4.下楼吃面','5.吃屎堂','6.下楼吃小炒','7.再来一次']
app.get('/drink', function (request, response) {
  let result = "";
  let random = Math.random() * drinkArr.length
  let drinkArrindex = Math.floor(random)

  result = drinkArr[drinkArrindex]
  response.send(result)
})

app.get('/', function (request, response) {
  // send接口会判断你传入的值的类型，文本的话则会处理为text/html
  response.send(
    fs.readFileSync(__dirname + '/index.html', 'utf-8')
  )
})


app.listen(3000); //监听3000端口
console.log('success listen');
