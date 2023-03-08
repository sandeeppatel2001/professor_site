var requirejs = require("requirejs");
requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require,
});
let h5 = document.getElementById("researchh5");
let data = ["Ram", "Shyam", "Sita", "Gita"];
document.getElementById("research").addEventListener("click", () => {
  let text = prompt("Please Enter Your Password", "");
  let hr = document.createElement("hr");
  h5.appendChild(hr);
  var MongoClient = requirejs("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = text;
    dbo.collection("customers").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  let li = document.createElement("a");
  li.innerText = text;
  h5.appendChild(li);
  //   data.forEach((item) => {
  //     let hr = document.createElement("hr");
  //     h5.appendChild(hr);
  //     let li = document.createElement("a");
  //     li.innerText = item;
  //     h5.appendChild(li);
  //   });
});
////////////////////////////////////////////newssssss
let newsul = document.getElementById("aa");

document.getElementById("newspen").addEventListener("click", () => {
  let text = prompt("heading", "");
  let li = document.createElement("li");
  let h6 = document.createElement("h6");
  h6.innerText = text;
  li.appendChild(h6);
  li.append("nsdncsdifnf");
  newsul.prepend(li);
});
