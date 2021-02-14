const { IDB_My } = require('./IMongo');

function MyChat () {
    // const url = 'mongodb://127.0.0.1:27017';
    // const opt = { useUnifiedTopology: true };
    const db = new IDB_My('chat_db');
    const collUser = 'users';
    const collMsg = 'msgs';

    function checkLogin (str) {
        return str.search(/^[а-яА-Яa-zA-Z0-9]{3,10}$/);
    }

    function getMsgsCollName () {
        const date = new Date();
        return collMsg + '_' + date.getMonth() + '_' + date.getFullYear();
    }

    this.UserReg = async function (params) {
        // const out = {}; // ????
        if (checkLogin(params[0]) !== 0) throw ('Bad login');
        // if (this.checkPassw(password) !== 0) throw('Bad password');

        // const collName = getMsgsCollName();
        const find = await db.isExist(collUser, { login: { $eq: params[0] } });

        // TODO: temp
        console.log(find);

        if (find !== null) throw ('User existing');
        const res = await db.create(collUser, { login: params[0], pass: params[1] });
        return res; // res.then(p=>{});
    }

    // this.AddMsg = function (params) {
    //     // --------Temp------------------------
    //     console.log('MyChat.AddMsg: ' + params);
    //     (function (ms) {
    //         const start = Date.now(); let now = start;
    //         while (now - start < ms) {
    //             now = Date.now();
    //         }
    //     })(3000);
    //     // --------Temp^^^^--------------------
    //     const collName = getMsgsCollName();
    //     const res = db.create(collName, { user_id: params[0], msg: params[1] });
    //     return res;
    // }

    this.AddMsg = async function (params) {
        // --------Temp------------------------
        console.log('MyChat.AddMsg: ' + params);
        // (function (ms) {
        //     const start = Date.now(); let now = start;
        //     while (now - start < ms) {
        //         now = Date.now();
        //     }
        // })(3000);
        // --------Temp^^^^--------------------
        const collName = getMsgsCollName();
        const res = await db.create(collName, { user_id: params[0], msg: params[1] });
        return res;
    }

    this.GetMsg = function (date, range, res) {
        const collName = getMsgsCollName();
        const arrData = db.find();
        return arrData;

        // const collName = 'msgData_' + date.getMonth();
        // MongoClient.connect(url, opt,
        //     function (err, gDB) {
        //         if (err) throw err;
        //         const dbo = gDB.db('MsgDb' + date.getFullYear());
        //         dbo.collection(collName, function (err, items) {
        //             if (err) throw err;
        //             // items.find({ _id: { $gte: date } }, { limit: (range * 24) + 1, sort: { _id: 1 } },
        //             items.find({ date: { $lt: date } }, { limit: range * 24, sort: { date: 1 } },
        //                 function (err, cursor) {
        //                     if (err) throw err;
        //                     cursor.toArray(function (err, itemArr) {
        //                         if (err) throw err;
        //                         // console.log('finding data: %d', itemArr.length);
        //                         res.json(itemArr);
        //                         gDB.close();
        //                     });
        //                     // displayWords("Words starting with a, b or c: ", cursor);
        //                 }
        //             );
        //         });
        //         // TODO: ????
        //         // setTimeout(function () {
        //         //     gDB.close();
        //         //     // console.log('db close');
        //         // }, 3000);
        //     });
    }
}

module.exports = MyChat;
