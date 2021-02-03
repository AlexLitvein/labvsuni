const MongoClient = require('mongodb').MongoClient; // npm install --save mongodb

function MyChat () {
    const url = 'mongodb://127.0.0.1:27017';
    const opt = { useUnifiedTopology: true };

    this.AddMsg = function (params) { // params[0] = response
        console.log(params);

        const date = new Date();
        const collName = 'msgData_' + date.getMonth();
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) { throw err; }
                const dbo = gDB.db('MsgDb' + date.getFullYear());
                dbo.collection(collName).insertOne({ msg: params }, function (err, res) {
                    if (err) throw err;
                    // console.log('1 document inserted');
                    gDB.close();
                });
            });
        return 0;
    }

    this.GetMsg = function (date, range, res) {
        const collName = 'msgData_' + date.getMonth();
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) throw err;
                const dbo = gDB.db('MsgDb' + date.getFullYear());
                dbo.collection(collName, function (err, items) {
                    if (err) throw err;
                    // items.find({ _id: { $gte: date } }, { limit: (range * 24) + 1, sort: { _id: 1 } },
                    items.find({ date: { $lt: date } }, { limit: range * 24, sort: { date: 1 } },
                        function (err, cursor) {
                            if (err) throw err;
                            cursor.toArray(function (err, itemArr) {
                                if (err) throw err;
                                // console.log('finding data: %d', itemArr.length);
                                res.json(itemArr);
                                gDB.close();
                            });
                            // displayWords("Words starting with a, b or c: ", cursor);
                        }
                    );
                });
                // TODO: ????
                // setTimeout(function () {
                //     gDB.close();
                //     // console.log('db close');
                // }, 3000);
            });
    }
}

module.exports = MyChat;
