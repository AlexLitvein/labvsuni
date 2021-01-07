const net = require('net');
const cron = require('node-cron');
// const { deflateSync } = require('zlib');
const dataColl = new (require('./comjs/ISensDataDB_v1.0'))();
const client = new net.Socket();

let doCollect = true;
// const idTim = null;
let task = null;
// let arrDbData = null;
const cntDays = 31;
// let countMinute = 0;

// if(process.env.NODE_ENV === 'production') {
//     console.log('We are running in production mode');
// } else {
//    console.log('We are running in development mode');
// }

// const jsstr1 = { _id: 0, t: 1, p: 760.36, h: 28.83 };
// const jsstr2 = '{"_id":0,"t":1,"p":760.36,"h":28.83}'; // !!!!!!!!!!!
// var jsstr3 = {d:"",t:1,p:760.36,h:28.83};

// jsstr._id = 1;
// dataColl.addSensData(jsstr);
// jsstr._id = 5;
// dataColl.addSensData(jsstr);
// jsstr._id = 10;
// dataColl.addSensData(jsstr);

// dataColl.newAdd_1(jsstr1);
// dataColl.newAdd_1(jsstr2);
// dataColl.newAdd_1(jsstr3);

function GetSensData () {
    // console.log('Tick.');
    if (doCollect) {
        client.connect(80, '192.168.0.11', function () {
            // console.log('Connected');
            client.write('GET /sensdata');
        });

        // client.connect(80, '192.168.0.11', function() {
        //     console.log('Connected');
        //     client.write('GET /sensdata');
        // });
    }
}

function encodeData (data) {
        let out = 0;
        out = data.getHours() * 1000000 + data.getDate() * 10000 + (data.getMonth() + 1) * 100 + data.getFullYear() % 100;
        return out;
    }

function createDbFakeData () {
        const arrData = new Array();
        let data = new Date(); // только чтоб получить TimezoneOffset
        data = new Date(2020, 11, 17, (-data.getTimezoneOffset() / 60) - 1); // ! январь = 0, декабрь = 11
        for (let i = 0; i < (cntDays * 24) + 1; i++) {
            const fakeData = { _id: 0, temp: 0, p: 0, hg: 0 }; // именно в теле цикла!!!
            data.setHours(data.getHours() + 1);
            const d = new Date(data);
            fakeData._id = d;
            // fakeData._id =  "0" + "/" + ("0" + data.getDate()).slice(-2) + "/" + ("0" + data.getMonth()).slice(-2) + "/" + data.getFullYear()%100; // temp for error
            fakeData.temp = (Math.random() * 100) - 50;
            fakeData.p = 600 + (Math.random() * 350);
            fakeData.hg = (Math.random() * 100);
            arrData.push(fakeData);
        }
        arrDbData = arrData;
    }

// idTim = setInterval(function () {
//     GetSensData();
// }, 2000);

// client.on('data', function (data) {
//     // console.log('Received: ' + data);
//     // let sensJSON;
//     let s1 = new String(data);
//     const idx = s1.indexOf('{');
//     if (idx >= 0) {
//         s1 = s1.slice(idx);
//         const sensJSON = JSON.parse(s1);
//         // const date = new Date();
//         sensJSON._id = new Date();
//         dataColl.AddCurrSensData(sensJSON);
//         if (countMinute >= 60) {
//             dataColl.AddSensData(sensJSON);
//             countMinute = 0;
//         }
//     }
//     // client.destroy(); // kill client after server's response
//     client.end();
// });

client.on('data', function (data) {
    // console.log('Received: ' + data);
    // let sensJSON;
    // let s1 = new String(data);
    const idx = data.indexOf('{');
    if (idx >= 0) {
        data = data.slice(idx);
        const sensJSON = JSON.parse(data);
        // const date = new Date();
        sensJSON._id = new Date();
        dataColl.AddCurrSensData(sensJSON);
        if ((sensJSON._id.getMinutes() % 60) === 0) {
            dataColl.AddSensData(sensJSON);
            // countMinute = 0;
        }
    }
    // client.destroy(); // kill client after server's response
    client.end();
});

// client.on('close', function() { // Emitted once the socket is fully closed
// console.log('Connection closed');
// });

client.on('error', function () {
    doCollect = false;
    // client.removeAllListeners(); // тогда не перехватываются исключения при подключении
	console.log('error connection');
});

// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// * * * * * *
task = cron.schedule('*/2 * * * * *', () =>  { // '*/2 * * * * *'
    // console.log('boom!');
    // countMinute += 10;
    GetSensData();
  }, { scheduled: true, timezone: 'Asia/Novosibirsk' });

  task.start();
  // task.stop();

// function testAddCurrData () {
//     const sensJSON = JSON.parse(jsstr2);
//     const date = new Date();
//     sensJSON._id = date;
//     dataColl.AddCurrSensData(sensJSON);
//     dataColl.AddSensData(sensJSON);
// }
// idTim = setInterval(function () {
//     testAddCurrData();
// }, 2000);

  // createDbFakeData();
  // dataColl.AddSensDataMany("data_" + 2, arrDbData);

  // 761204 = 76*10000 + 12*100 + 4
  // var dt = new Date(2020, 0, 1, 12 + 7); // 7 TimezoneOffset
  // var dt = new Date();
  // dataColl.GetSensData("data_" + 1, dt, 24, arrDbData);
