const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
//mongodb+srv://sandeepkrpatel2002:Tesla@261600@cluster1.gfvjfls.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://sandeepkrpatel2002:Tesla2616@cluster1.gfvjfls.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e, r) => {
    if (!e) console.log("connection succ");
    else console.log(e);
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
////////////////////////////////
var timageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

let timgModel = new mongoose.model("researchImage", timageSchema);
////////////////////////////////
var peopleSchema = new mongoose.Schema({
  name: String,
  desc: String,
  member: String,
  desc: String,
  email: String,
  education: String,
  curresearch: String,
  resume: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

let peopleModel = new mongoose.model("peopleImage", peopleSchema);
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
const auth = async (req, res, next) => {
  try {
    // fs.readFile("tokdata.txt", "utf8", function (err, data) {
    //   const token = data;
    const authtoken = req.body.token;
    console.log("authfunxction");
    console.log("auth", req.body);
    console.log("authfunction", authtoken);
    if (!authtoken) {
      console.log("!Token");
    } else {
      console.log("tryveryfy");
      // veryfying token
      jwt.verify(authtoken, "sandeep", (err, res) => {
        console.log("res", res);
        if (err) {
          console.log("auth function error running");
          console.log(err);
          res.send({ istrue: false });
        } else {
          console.log("verify true");

          return next();
        }
      });
    }

    //});
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // setTimeout(() => {
  //     window.location.href="./index.html";
  // }, 5000);
});
///////////////////////////////////////
app.post("/researchsave", auth, async (req, res) => {
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
  jwt.verify(req.body.token, "sandeep", (err, ress) => {
    if (err) {
      console.log(err);
      res.send({ array, istrue: false });
    } else {
      console.log("verify true");
      res.send({ array, istrue: true });
    }
  });
});
app.post("/researchdel", auth, async (req, res) => {
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
app.post("/newssave", auth, async (req, res) => {
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
    .then(async (p) => {
      console.log(p);
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ p, istrue: false });
        } else {
          console.log("verify true");
          res.send({ p, istrue: true });
        }
      });

      // p.forEach((t) => {
      //   console.log(t);
      //   array.push(t.data);
      // });
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/newsdel", auth, async (req, res) => {
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

app.post("/mainresearchsave", auth, async (req, res) => {
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
    .then(async (p) => {
      console.log(p);
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ t: p, istrue: false });
        } else {
          console.log("verify true");
          res.send({ t: p, istrue: true });
        }
      });

      // res.send(p);
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/mainresearchdel", auth, async (req, res) => {
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
app.post("/teachingsave", auth, async (req, res) => {
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
    .then(async (p) => {
      console.log(p);
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ t: p, istrue: false });
        } else {
          console.log("verify true");
          res.send({ t: p, istrue: true });
        }
      });

      // res.send(p);
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/teachingdel", auth, async (req, res) => {
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
app.post("/publicationsave", auth, async (req, res) => {
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
    .then(async (p) => {
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ t: p, istrue: false });
        } else {
          console.log("verify true");
          res.send({ t: p, istrue: true });
        }
      });

      // res.send(p);
    })
    .catch((error) => console.log(error));
  // console.log("..array=", ...array);
});
app.post("/publicationdel", auth, async (req, res) => {
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
  imgModel.find({}, async (err, items) => {
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
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ t: a, istrue: false });
        } else {
          console.log("verify true");
          res.send({ t: a, istrue: true });
        }
      });

      // res.send(a);
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
app.post("/gallerydel", auth, async (req, res) => {
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
//////////////////////////////////
app.post("/gallerytfind", (req, res) => {
  let a = [];
  timgModel.find({}, async (err, items) => {
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
      console.log("galeytfindrunnig", a.length);
      // fs.writeFileSync("sandeep.txt", items[0].img.data);
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ t: a, istrue: false });
        } else {
          console.log("verify true");
          res.send({ t: a, istrue: true });
        }
      });
    }
  });
});
app.post("/galleryt", upload.single("image"), (req, res, next) => {
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
  timgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("./experiment.html");
    }
  });
});
app.post("/gallerytdel", auth, async (req, res) => {
  console.log(3, req.body.text);
  timgModel.deleteOne(
    { name: req.body.text.trim() + ": " },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("gallerytremove", data);
      }
    }
  );
});
//////////////////////////////////////////////////////////////
app.post("/peoplefind", (req, res) => {
  console.log("peoplefind");
  let a = [];
  peopleModel.find({}, async (err, items) => {
    console.log("jjj");
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      console.log("not geting anu error");
      items.forEach((w) => {
        let dat = {
          contentType: w.img.contentType,
          name: w.name,
          x: w.img.data.toString("base64"),
          desc: w.desc,

          member: w.member,

          email: w.email,

          education: w.education,
          curresearch: w.curresearch,
          resume: w.resume,

          x: w.img.data.toString("base64"),
        };
        a.push(dat);
      });
      console.log("peoplefindrunnig", a.length);
      // fs.writeFileSync("sandeep.txt", items[0].img.data);
      jwt.verify(req.body.token, "sandeep", (err, ress) => {
        if (err) {
          console.log(err);
          res.send({ t: a, istrue: false });
        } else {
          console.log("verify true");
          res.send({ t: a, istrue: true });
        }
      });

      // res.send(a);
    }
  });
});
app.post("/people", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  let name = req.body.name.trim();
  let member = req.body.member.trim();
  let email = req.body.email.trim();
  let desc = req.body.desc.trim();
  let education = req.body.education.trim();
  let curresearch = req.body.curresearch.trim();
  let resume = req.body.resume.trim();

  var obj = {
    name,
    member,
    desc,
    email,
    education,
    curresearch,
    resume,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  peopleModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log("people save");
      // item.save();
      res.redirect("./people.html");
    }
  });
});

app.post("/peopledel", auth, async (req, res) => {
  console.log(3, req.body.text);
  peopleModel.deleteOne({ name: req.body.text.trim() }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("peopleremove", data);
    }
  });
});
app.post("/login", (req, res) => {
  console.log("login running");
  if (req.body.text == "2121") {
    let data = {
      time: Date(),
      userId: 12,
    };

    const token = jwt.sign({ id: 323232 }, "sandeep", {
      expiresIn: 3600,
    });
    console.log(token);
    res.send({ token, istrue: true });
  } else {
    res.send({ istrue: false });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("sandeep patel");
});
////////////////////////////////
