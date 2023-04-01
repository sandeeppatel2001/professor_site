// const { response } = require("express");
let token = localStorage.getItem("sandeep");
let main = document.getElementById("main");
document.getElementById("del").addEventListener("click", () => {
  let text = prompt("heading", "");
  text = text.trim();
  if (!text) return;
  const req = new XMLHttpRequest();
  const baseUrl = "https://polymer.adaptable.app/gallerydel";
  let data = { text, token };
  const urlParams = data;

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));
});
let fun1 = function () {
  const req = new XMLHttpRequest();
  const baseUrl = "https://polymer.adaptable.app/galleryfind";

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
      if (nodedata.istrue == true) {
        document.getElementById("plus").style.display = "visible";
        document.getElementById("del").style.display = "visible";
      }
      nodedata.t.forEach((image) => {
        console.log(image);
        let div = document.createElement("div");
        div.setAttribute("class", "one_third");
        let a = document.createElement("a");
        a.setAttribute("class", "one_third_img");
        let img = document.createElement("img");
        img.src = `data:image/${image.contentType};base64,${image.x}`;

        // let t = btoa(String.fromCharCode.apply(null, image.img.data));
        // let p = document.createElement("p");
        a.append(img);
        div.append(a);

        let div2 = document.createElement("div");
        div2.setAttribute("class", "pading");
        let b = document.createElement("b");
        b.append(image.name);
        div2.append(b);
        div2.append(image.desc);
        div.append(div2);
        main.prepend(div);
      });
    }
  };
};
fun1();
