const fs = require('fs');
const https = require('https');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const dataColl = new (require('./comjs/ISensDataDB_v1.0'))();
const chat = new (require('./comjs/chat_be_01'))();
const visitCount = new (require('./comjs/helpers_be')).VisiterCounter();
const favicon = require('serve-favicon');
const rfs = require('rotating-file-stream'); // version 2.x
const cron = require('node-cron'); // npm install cron , npm install --save node-cron

// ---------------------------------------
const myAct = {
  regFunc: function (name, f) { this[name] = f; },

  callFunc: async function (response, name, params) {
    try {
      const fu = myAct[name];
      if (fu) {
        console.log(`myAct ${name} ${params}`);
        const res = await fu(params);
        response.json(res);
      }
    } catch (e) {
      response.json(e);
    }
  }
};

myAct.regFunc('AddMsgz08Kw4fu', chat.AddMsg);
myAct.regFunc('GetMsgzd08Khw4fu', chat.GetMsg);
myAct.regFunc('UserRegzd08hvlKhwfu', chat.UserReg);

// ---------------------------------------
const app = express();
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
// ---------HTTPS----------------
// const httpsOptions = {
//   cert: fs.readFileSync('./ssl/certificate.crt'),
//   ca: fs.readFileSync('./ssl/ca_bundle.crt'),
//   key: fs.readFileSync('./ssl/private.key')
// };
// app.set('port', 443);
// const httpsServer = https.createServer(httpsOptions, app);
// httpsServer.listen(app.get('port'), function () {
//       console.log('Express запущен на localhost:' +
//         app.get('port') + '; нажмите Ctrl+C для завершения.');
//    });
// ---------EndHTTPS----------------
// ---------HTTP----------------
app.set('port', 80);
app.listen(app.get('port'), function () { // return Class: net.Server
  console.log('Express запущен на localhost:' +
    app.get('port') + '; нажмите Ctrl+C для завершения.');
});
// ---------EndHTTP----------------
// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// * * * * * *
const task = cron.schedule('* */24 * * *', () => { // '0 */1 * * *'
  // console.log('boom!');
  // console.log(visitCount.GetName());
  const dataIn = {
    d: new Date(),
    count: visitCount.GetCount()
  };
  dataColl.AddAnyOneData('statistic', 'visit', dataIn);
  visitCount.Reset();
}, {
  scheduled: true, timezone: 'Asia/Novosibirsk'
});
task.start();
// task.stop();
// --------------------------------------

// --------------------------------------
// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

// -------------------------
// Первый!!!!
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: function (req, res) {
    return req.url !== '/weather';
  }
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '/public')));
// -----------------------------------

app.post('/weather/chat', function (req, res) {
  const fName = req.body.f;
  const params = req.body.params;
  myAct.callFunc(res, fName, params);

  // temp
  // console.log('app.post: ' + fName + ' ' + params[0]);
  // res.json('ok');
});

app.post('/weather/getSensData', function (req, res) {
  const date = new Date(req.body.startData);
  date.setHours(0);
  const range = parseInt(req.body.range);
  const collName = 'sensData_' + date.getFullYear();
  // TODO: имя коллекции от года в запросе
  dataColl.GetSensData(collName, date, range, res);
});

app.post('/weather/getCurrSensData', function (req, res) {
  dataColl.GetCurrSensData(res);
});

app.get('/weather', function (req, res) {
  // res.render(path.join(__dirname, './weather/views/layouts/main.hbs'));
  visitCount.increment();
  res.render('pan1', { pageData: { msg: visitCount.GetCount() } });
  // res.render(path.join('main'));
  // console.log('weather');
});

app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 — Не найдено');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 — Ошибка сервера');
});
