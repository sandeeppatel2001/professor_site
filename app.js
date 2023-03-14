const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const rrr = path.join(__dirname, "/");
// const { a } = require("./a.js");
// a();
var fs = require("fs");
app.set("view engine", "ejs");
// require("dotenv/config");
const bodyParser = require("body-parser");
const { link } = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(rrr));
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
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
////////////////////////////////
var imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

let imgModel = new mongoose.model("finalImage", imageSchema);
/////////////////////////////////
const contactSchema = {
  data: String,
};
const Contact = mongoose.model("Contact", contactSchema);
/////////////////////////////////////////////////////
const newsSchema = {
  heading: String,
  detail: String,
};
const newsContact = mongoose.model("news", newsSchema);
//////////////////////////////////////////////////////////
const mainresearch = {
  tag: String,
  data: String,
};
const mainresearchContact = mongoose.model("mainresearch", mainresearch);
//////////////////////////////////////////////////////////////
const teaching = {
  tag: String,
  data: String,
};
const teachingContact = mongoose.model("teachin", teaching);
///////////////////////////////////////////////////////////////////////////
const publication = {
  tag: String,
  data: String,
  link: String,
};
const publicationContact = mongoose.model("publication", publication);
////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // setTimeout(() => {
  //     window.location.href="./index.html";
  // }, 5000);
});
///////////////////////////////////////
app.post("/researchsave", async (req, res) => {
  // console.log(req.body);
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
  // console.log(req.body);
  Contact.deleteOne({ data: req.body.text }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("reserchremove");
    }
  });
});
///////////////////////////////////
app.post("/newssave", async (req, res) => {
  // console.log(req.body);
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
  // console.log(req.body);
  newsContact.deleteOne({ heading: req.body.text }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("newsremove");
    }
  });
});

///////////////////////////////

app.post("/mainresearchsave", async (req, res) => {
  // console.log(1, req.body);
  const contactt = new mainresearchContact({
    tag: req.body.tag,
    data: req.body.data,
  });
  contactt.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("savedata");
    }
  });
});
app.post("/mainresearchfind", async (req, res) => {
  let array = new Array();
  // console.log(2, req.body);
  await mainresearchContact
    .find()
    .populate()
    .then((p) => {
      console.log(p);
      res.send(p);
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/mainresearchdel", async (req, res) => {
  // console.log(3, req.body);
  mainresearchContact.deleteOne(
    { tag: req.body.tag, data: req.body.data },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("mainresearchremove", data);
      }
    }
  );
});
////////////////////////////////////////////
app.post("/teachingsave", async (req, res) => {
  //console.log(1, req.body);
  const contactt = new teachingContact({
    tag: req.body.tag,
    data: req.body.data,
  });
  contactt.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("savedata");
    }
  });
});
app.post("/teachingfind", async (req, res) => {
  let array = new Array();
  //console.log(2, req.body);
  await teachingContact
    .find()
    .populate()
    .then((p) => {
      console.log(p);
      res.send(p);
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/teachingdel", async (req, res) => {
  //console.log(3, req.body);
  teachingContact.deleteOne(
    { tag: req.body.tag, data: req.body.data },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("teachingremove", data);
      }
    }
  );
});
/////////////////////////////////////////////publicationsave
app.post("/publicationsave", async (req, res) => {
  // console.log(1, req.body);
  const contactt = new publicationContact({
    tag: req.body.tag,
    data: req.body.data,
    link: req.body.link,
  });
  contactt.save(function (err) {
    if (err) {
      throw err;
    } else {
      console.log("savedata");
    }
  });
});
app.post("/publicationfind", async (req, res) => {
  let array = new Array();
  // console.log(2, req.body);
  await publicationContact
    .find()
    .populate()
    .then((p) => {
      console.log(p);
      res.send(p);
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/publicationdel", async (req, res) => {
  // console.log(3, req.body);
  publicationContact.deleteOne(
    { tag: req.body.tag, data: req.body.data },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("publicationremove", data);
      }
    }
  );
});
//////////////////////////////////
app.post("/galleryfind", (req, res) => {
  let a = [];
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      items.forEach((w) => {
        let dat = {
          contentType: w.img.contentType,
          name: w.name,
          x: w.img.data.toString("base64"),
          desc: w.desc,
        };
        a.push(dat);
      });
      console.log("galeyfindrunnig", a.length);
      // fs.writeFileSync("sandeep.txt", items[0].img.data);

      res.send(a);
    }
  });
});
app.post("/gallery", upload.single("image"), (req, res, next) => {
  console.log(req.body.name);
  let name = req.body.name.trim();
  name = name + ": ";
  var obj = {
    name: name,
    desc: req.body.desc.trim(),

    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("./gallery.html");
    }
  });
});
app.post("/gallerydel", async (req, res) => {
  console.log(3, req.body.text);
  imgModel.deleteOne(
    { name: req.body.text.trim() + ": " },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("galleryremove", data);
      }
    }
  );
});
//////////////////////////////////////////////////////////////
app.listen(3000, () => {
  console.log("sandeep patel");
});
////////////////////////////////
