const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const rrr = path.join(__dirname, "/");
// const { a } = require("./a.js");
// a();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(rrr));
mongoose.connect(
  "mongodb://localhost:27017/newCollection",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e, r) => {
    console.log("connection succ");
  }
);

const contactSchema = {
  data: String,
};
const Contact = mongoose.model("Contact", contactSchema);
const newsSchema = {
  heading: String,
  detail: String,
};
const newsContact = mongoose.model("news", newsSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // setTimeout(() => {
  //     window.location.href="./index.html";
  // }, 5000);
});
app.post("/researchsave", async (req, res) => {
  console.log(req.body);
  const contact = new Contact({
    data: req.body.text,
  });
  contact.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("savedata");
    }
  });
});
app.post("/researchfind", async (req, res) => {
  let array = new Array();
  await Contact.find()
    .populate()
    .then((p) => {
      p.forEach((t) => {
        // console.log(t.data);
        array.push(t.data);
      });
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
  res.send(array);
});
app.post("/researchdel", async (req, res) => {
  console.log(req.body);
  Contact.deleteOne({ data: req.body.text }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("reserchremove");
    }
  });
});
app.post("/newssave", async (req, res) => {
  console.log(req.body);
  const contact = new newsContact({
    heading: req.body.heading,
    detail: req.body.detail,
  });
  contact.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("savedata");
    }
  });
});
app.post("/newsfind", async (req, res) => {
  let array = new Array();
  await newsContact
    .find()
    .populate()
    .then((p) => {
      console.log(p);
      res.send(p);
      // p.forEach((t) => {
      //   console.log(t);
      //   array.push(t.data);
      // });
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/newsdel", async (req, res) => {
  console.log(req.body);
  newsContact.deleteOne({ heading: req.body.text }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("newsremove");
    }
  });
});
app.listen(3000, () => {
  console.log("sandeep patel");
});
////////////////////////////////
