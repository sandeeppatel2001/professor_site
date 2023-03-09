let h5 = document.getElementById("researchh5");
let data = ["Ram", "Shyam", "Sita", "Gita"];
document.getElementById("research").addEventListener("click", () => {
  let text = prompt("Please Enter Your Password", "");
  let hr = document.createElement("hr");
  h5.appendChild(hr);

  let li = document.createElement("a");
  li.innerText = text;
  h5.appendChild(li);
  let data = { text };
  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/researchsave";
  const urlParams = data;

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

  // data.forEach((item) => {
  //   let hr = document.createElement("hr");
  //   h5.appendChild(hr);
  //   let li = document.createElement("a");
  //   li.innerText = item;
  //   h5.appendChild(li);
  // });
});
////////////////////////////////////////////newssssss
let newsul = document.getElementById("aa");

document.getElementById("newspen").addEventListener("click", () => {
  let text = prompt("heading", "");

  let textd = prompt("detail", "");
  //////////////////////////////
  if (text.length && textd.length) {
    let li = document.createElement("li");
    let h6 = document.createElement("h6");
    let p = document.createElement("p");
    p.setAttribute("class", "hi");

    h6.innerText = text;

    li.appendChild(h6);

    p.append(textd);
    li.append(p);
    newsul.prepend(li);

    /////////////////////////

    let data = { heading: text, detail: textd };
    const req = new XMLHttpRequest();
    const baseUrl = "http://localhost:3000/newssave";
    const urlParams = data;

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
  }
});
let researchfinddata = function () {
  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/researchfind";
  let data = {};
  const urlParams = data;

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      // console.log("iiiii", nodedata);
      nodedata.forEach((element) => {
        console.log(element);
        let hr = document.createElement("hr");
        h5.appendChild(hr);

        let li = document.createElement("a");
        li.innerText = element;
        h5.appendChild(li);
      });
    }
  };
};
researchfinddata();

let newsfinddata = function () {
  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/newsfind";
  let data = {};
  const urlParams = data;

  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      // console.log("iiiii", nodedata);

      nodedata.forEach((element) => {
        let li = document.createElement("li");
        let h6 = document.createElement("h6");
        h6.setAttribute("class", "news_title");
        let p = document.createElement("p");
        p.setAttribute("class", "hi");
        console.log(element);
        h6.innerText = element.heading;
        console.log(element.heading);
        li.appendChild(h6);

        p.append(element.detail);
        li.append(p);
        newsul.prepend(li);
      });
    }
  };
};

document.getElementById("researchdel").addEventListener("click", () => {
  let text = prompt("whichone want to delete", "");
  console.log(text.length);
  if (text.length) {
    let data = { text };
    const req = new XMLHttpRequest();
    const baseUrl = "http://localhost:3000/researchdel";
    const urlParams = data;

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
  }
});
/////////////////////////////
document.getElementById("newsdel").addEventListener("click", () => {
  let text = prompt("whichone want to delete", "");
  console.log(text.length);
  if (text && text.length) {
    let data = { text };
    const req = new XMLHttpRequest();
    const baseUrl = "http://localhost:3000/newsdel";
    const urlParams = data;

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
  }
});
newsfinddata();
