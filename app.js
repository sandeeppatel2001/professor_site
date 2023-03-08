const express = require("express");
const path = require("path");
const app = express();
const rrr = path.join(__dirname, "/");
// const { a } = require("./a.js");
// a();
app.use(express.static(rrr));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // setTimeout(() => {
  //     window.location.href="./index.html";
  // }, 5000);
});
app.listen(3000, () => {
  console.log("sandeep patel");
});
////////////////////////////////
