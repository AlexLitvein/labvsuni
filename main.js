const express = require('express');
const exphbs = require('express-handlebars');
const  morgan  =  require('morgan');
const path = require('path');
const dataColl = new (require('./public/ISensDataDB_v1.0'))();
const visitCount = new (require('./public/helpers')).VisiterCounter();
const favicon  =  require('serve-favicon');
const rfs = require('rotating-file-stream'); // version 2.x
const cron = require('node-cron'); // npm install cron , npm install --save node-cron

// --------------------------------------
// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// * * * * * *
const task = cron.schedule('* */24 * * *', () =>  { // '0 */1 * * *'
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

const app = express();
app.set('port', process.env.PORT || 3000);

// return Class: net.Server
app.listen(app.get('port'), function () {
    console.log('Express запущен на http://localhost:' +
      app.get('port') + '; нажмите Ctrl+C для завершения.');
 });

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

 // -----------------------
//  const socketio = require('socket.io')(server);
//  let count = 0
//  socketio.on('connection', function (client) {
//      count++;
//      console.log('count %d', count);
//      // client.broadcast({ count: count })
//      client.on('disconnect', function () {
//          count--;
//          console.log('count %d', count);
//      })
//  })
// -----------------------
//  server.on('connection', function name (params) {
//     console.log('connection *');
//  });

// Первый!!!!
app.use(morgan('combined', {
    stream: accessLogStream,
    skip: function (req, res) {
        return req.url !== '/weather';
    }
  }));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '/weather/public')));
app.use(express.static(path.join(__dirname, '/public')));
// -----------------------------------

app.get('/', function (req, res) {
       res.sendFile(path.join(__dirname, '/index.html'));
   });

app.post('/weather/getSensData', function (req, res) {
    const date = new Date(req.body.startData);
    const toffs =  date.getTimezoneOffset();
    date.setHours(-toffs / 60);

    const range = parseInt(req.body.range);
    // console.log('req data: %s %d', date, range);
    // TODO: имя коллекции от года в запросе
    dataColl.GetSensData('data_' + 1, date, range, res);
});

app.post('/weather/getCurrSensData', function (req, res) {
  dataColl.GetCurrSensData(res);
});

// app.get('/weather', function (req, res) {
//     res.sendFile(path.join(__dirname, '/weather/index.html'));
//     // console.log('weather');
// });

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

// app.listen(app.get('port'), function () {
//    console.log('Express запущен на http://localhost:' +
//      app.get('port') + '; нажмите Ctrl+C для завершения.');
// });
