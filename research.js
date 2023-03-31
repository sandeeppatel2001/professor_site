let font = document.getElementById("font");
let token = localStorage.getItem("sandeep");
document.getElementById("plus").addEventListener("click", async () => {
  let text = prompt("Please Enter Your tag", "");
  text = text.trim();

  let tag = document.createElement(text);
  let text2 = prompt("enter your text here", "");
  text2 = text2.trim();
  if (!text2) return;
  tag.append(text2);
  font.append(tag);

  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/mainresearchsave";
  const urlParams = {
    tag: text,
    data: text2,
    token,
  };

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      console.log("iiiii", nodedata);
    }
  };
});

document.getElementById("del").addEventListener("click", () => {
  let text = prompt("Please Enter Your tag", "");
  text = text.trim();
  let tag = document.createElement(text);
  let text2 = prompt("enter you text here", "");
  text2 = text2.trim();
  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/mainresearchdel";
  const urlParams = {
    tag: text,
    data: text2,
    token,
  };

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      console.log("iiiii", nodedata);
    }
  };
});

let fun1 = function () {
  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/mainresearchfind";

  let data = { token };
  const urlParams = data;

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      console.log("iiiii", nodedata);
      if (nodedata.istrue != true) {
        document.getElementById("plus").style.display = "none";
        document.getElementById("del").style.display = "none";
      }
      nodedata.t.forEach((element) => {
        let text = element.tag;
        text.trim();
        let tag = document.createElement(text);
        let text2 = element.data;
        tag.append(text2);
        font.append(tag);
      });
    }
  };
};
fun1();
