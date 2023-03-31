let a = function () {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  console.log("a.js");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("sandeeppppppppppp");
  }).then((db) => {
    var dbo = db.db("professor");

    var myobj = {
      data: ["sasad", "asdsd", "dnxanufsxhoughsdfg", "abgdgxsuyguaf"],
    };
    console.log(".then");
    dbo
      .collection("research")
      .insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      })
      .then((t) => {
        console.log(t);
      });
  });

  ////////////////////////
  // var MongoClient = require("mongodb").MongoClient;
  // var url = "mongodb://localhost:27017/";
  // console.log("a.jsruning");

  // MongoClient.connect(url, async function (err, db) {
  //   console.log("cration");
  // }).then((db) => {
  //   console.log("dsdsdsd");
  //   var dbo = db.db("professor");
  //   try {
  //     console.log("dsdfdsffffffffff");
  //     dbo.createCollection("research", function (err, res) {
  //       // if (err) throw err;
  //       console.log("Collection created!");
  //       db.close();
  //     });
  //   } catch (err) {
  //     console.log("err1");
  //     console.log(err);
  //   }
  //   console.log("done");
  // });
};
// a();
module.exports = { a };
