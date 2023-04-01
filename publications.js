let token = localStorage.getItem("sandeep");
let main = document.getElementById("inner_wrapper");
document.getElementById("plus").addEventListener("click", () => {
  let link = "";
  let tag = prompt("your tag", "");
  tag = tag.trim();
  if (!tag) return;
  let text = prompt("your header", "");
  text = text.trim();
  if (!text) return;
  let br = document.createElement("br");
  if (tag.toLowerCase() == "link") {
    link = prompt("link", "");
    link = link.trim();
    if (!link) {
      alert("link not provided");
      return;
    }
    let a = document.createElement("a");
    a.append(text);
    a.href = link;
    main.append(a);
    main.append(br);
  } else {
    let b = document.createElement(tag);
    b.append(text);
    main.append(b);
    main.append(br);
  }

  const req = new XMLHttpRequest();
  const baseUrl = "https://polymer.adaptable.app/publicationsave";
  const urlParams = {
    tag: tag,
    data: text,
    link: link,
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
  const baseUrl = "https://polymer.adaptable.app/publicationdel";
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
  const baseUrl = "https://polymer.adaptable.app/publicationfind";
  let token = localStorage.getItem("sandeep");
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
      nodedata.t.forEach((element) => {
        let link = "";
        let tag = element.tag;
        tag = tag.trim();
        if (!tag) return;
        let text = element.data;
        text = text.trim();
        if (!text) return;
        let br = document.createElement("br");
        if (tag.toLowerCase() == "link") {
          link = element.link;
          link = link.trim();
          if (!link) {
            alert("link not provided");
            return;
          }
          let a = document.createElement("a");
          a.append(text);
          a.href = link;
          main.append(a);
          main.append(br);
        } else {
          let b = document.createElement(tag);
          b.append(text);
          main.append(b);
          main.append(br);
        }
      });
    }
  };
};
fun1();
