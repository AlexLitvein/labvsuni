const MongoClient = require('mongodb').MongoClient; // npm install --save mongodb

function DataCollector () {
    const url = 'mongodb://127.0.0.1:27017';
    const opt = { useUnifiedTopology: true };

    MongoClient.connect(url, opt,
        function (err, gDB) {
            if (err) throw err;
            const dbo = gDB.db('SensDb');
            dbo.listCollections({ name: 'currSensData' }).toArray(function (err, collections) {
                if (err) throw err;
                if (collections.length === 0) {
                    dbo.createCollection('currSensData', { capped: true, size: 256, max: 1 },
                        function (err, collection) {
                            if (err) throw err;
                            gDB.close();
                        }
                    );
                    // console.log("coll not exists");
                } else {
                    gDB.close();
                    // console.log("!exists");
                }
            });
        });

    // function displayWords (msg, cursor, pretty) {
    //     cursor.toArray(function (err, itemArr) {
    //         if (err) { ; }
    //         console.log('finding data: %d', itemArr.length);
    //         // console.log("\n" + msg);
    //         // const wordList = [];
    //         for (let i = 0; i < itemArr.length; i++) {
    //             // wordList.push(itemArr[i]);
    //             console.log(itemArr[i]);
    //             console.log('\n');
    //         }
    //         // console.log(JSON.stringify(wordList, null, pretty));
    //     });
    // }

    // function findItems(err, items)
    // {
    //     var data = new Date("1/1/2020"); // м/д/г
    //     //let data = new Date("01 01 2020  00:00:00 GMT+0100");
    //     //let data = new Date(Date.UTC(2020, 1, 1, 0)); // м/д/г  !!!! январь = 0, декабрь = 11
    //     // new Date('Sun Feb 01 1998 00:00:00 GMT+0700')
    //     //data.setHours(23, 0, 0);
    //    // data.setUTCHours(0);
    //    var ms = data.getTime();

    //     //items.find({first:{$in: ['a', 'b', 'c']}},
    //     items.find({_id:{$gte: ms}}, { limit: 24, sort: {_id: 1}},
    //     function(err, cursor)
    //     {
    //         displayWords("Words starting with a, b or c: ", cursor);
    //     });
    // }

    // function isCollectionExists (db, collName) {
    //     db.listCollections({ name: collName }).toArray(function (err, collections) {
    //         if (err) throw err;
    //         if (collections.length === 0) {
    //             return false;
    //             // console.log("coll not exists");
    //         } else return true;
    //     });
    // }

    this.AddSensData = function name (sensData) {
        //const date = new Date();
        //const collName = 'sensData_' + date.getFullYear();
        const collName = 'sensData_' + sensData._id.getFullYear();
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) throw err;
                const dbo = gDB.db('SensDb');
                dbo.collection(collName).insertOne(sensData, function (err, res) {
                    if (err) throw err;
                    console.log('1 document inserted');
                    gDB.close();
                });
            });
    }

    // TODO: temp
    this.AddSensDataMany = function name (nameCollection, arrSensData) {
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) throw err;
                const dbo = gDB.db('SensDb');
                dbo.collection(nameCollection).insertMany(arrSensData, function (err, res) {
                    if (err) throw err;
                    //console.log('Many document inserted');
                    gDB.close();
                });
            });
    }

    this.GetSensData = function name (nameCollection, date, range, res) {
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) throw err;
                const dbo = gDB.db('SensDb');
                dbo.collection(nameCollection, function (err, items) {
                    if (err) throw err;
                    // items.find({ _id: { $gte: date } }, { limit: (range * 24) + 1, sort: { _id: 1 } },
                    items.find({ _id: { $gte: date } }, { limit: (range * 24) + 1, sort: { _id: 1 } },
                        function (err, cursor) {
                            if (err) throw err;
                            cursor.toArray(function (err, itemArr) {
                                if (err) throw err;
                                
                                //console.log('GetSensData: ' + date);

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

    this.GetCurrSensData = function name (res) {
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) throw err;
                const dbo = gDB.db('SensDb');
                dbo.collection('currSensData', function (err, items) {
                    if (err) throw err;
                    items.find({},
                        function (err, cursor) {
                            if (err) throw err;
                            cursor.toArray(function (err, itemArr) {
                                if (err) throw err;
                                // console.log('finding data: %d', itemArr.length);
                                res.json(itemArr);
                                gDB.close();
                            });
                        }
                    );
                });
            });
    }

    this.AddCurrSensData = function name (sensData) {
        // for shell db.createCollection("currSensData", { capped : true, size : 256, max : 1 } )
        MongoClient.connect(url, opt,
            function (err, gDB) {
                if (err) throw err;
                const dbo = gDB.db('SensDb');
                dbo.collection('currSensData').insertOne(sensData, function (err, res) {
                    if (err) throw err;
                    //console.log('1 document inserted');
                    gDB.close();
                });
            });
    }

    // this.AddCurrSensData_old = function name (sensData) {
    //     MongoClient.connect(url, opt,
    //         function (err, gDB) {
    //             if (err) throw err;
    //             const dbo = gDB.db('SensDb');
    //             dbo.collection('data_curr').deleteOne({}, function (err, results) {
    //                 if (err) throw err;
    //                 console.log('1 document deleted');
    //                 gDB.close();
    //             });
    //         });

    //         MongoClient.connect(url, opt,
    //             function (err, gDB) {
    //                 if (err) throw err;
    //                 const dbo = gDB.db('SensDb');
    //                 dbo.collection('data_curr').insertOne(sensData, function (err, res) {
    //                     if (err) throw err;
    //                     console.log('1 document inserted');
    //                     gDB.close();
    //                 });
    //             });
    // }
}

module.exports = DataCollector;
