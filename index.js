// const { text } = require("body-parser");

let slideIndex = 0;
showSlides();
let token = localStorage.getItem("sandeep");
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
//////////////////////////////////////////////////////

let h5 = document.getElementById("researchh5");
let data = ["Ram", "Shyam", "Sita", "Gita"];
document.getElementById("research").addEventListener("click", () => {
  // let text = prompt("Please Enter Your Password", "");
  let text;
  swal({
    title: "Enter text address",

    input: "textarea",
  }).then(function (res) {
    console.log(res);

    text = res.value;
    console.log(text);

    let hr = document.createElement("hr");
    h5.appendChild(hr);

    let li = document.createElement("a");
    li.innerText = text;
    h5.appendChild(li);
    text = text.trim();
    if (text) {
      // let token = localStorage.getItem("sandeep");
      let data = { text, token };
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
      swal({
        type: "success",
        html: "Your text: " + text,
      });
    } else {
      swal({
        type: "failed",
        html: "please fill all input ",
      });
    }
  });

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
  // let text = prompt("heading", "");

  // let textd = prompt("detail", "");
  //////////////////////////////
  let textd, text;
  swal({
    title: "Enter heading and detail address",

    html: `
    <input
    class="swal2-input"
    id="range-value">`,
    input: "textarea",
  }).then(function (res) {
    console.log(res);
    let text = document.getElementById("range-value").value;
    console.log("text", text);
    textd = res.value;
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

      let data = { token: token, heading: text.trim(), detail: textd.trim() };
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
      swal({
        type: "success",
        html: "Your text: " + text,
      });
    } else {
      swal({
        type: "failed",
        html: "please fill all input ",
      });
    }
  });
});
let researchfinddata = function () {
  const req = new XMLHttpRequest();
  const baseUrl = "http://localhost:3000/researchfind";
  let token = localStorage.getItem("sandeep");
  let data = { token };
  console.log(token);
  const urlParams = data;
  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      // console.log("iiiii", nodedata);
      if (nodedata.istrue != true) {
        document.getElementById("research").style.display = "none";
        document.getElementById("researchdel").style.display = "none";
      }

      nodedata.array.forEach((element) => {
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

  let data = { token };
  const urlParams = data;
  console.log(token);
  req.open("POST", baseUrl, true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(urlParams));

  req.onreadystatechange = async function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const nodedata = JSON.parse(this.responseText);
      // console.log("iiiii", nodedata);
      if (nodedata.istrue != true) {
        document.getElementById("newspen").style.display = "none";
        document.getElementById("newsdel").style.display = "none";
      }

      nodedata.p.forEach((element) => {
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
  //let text = prompt("whichone want to delete", "");
  let text;
  swal({
    title: "Enter text addressfor delete ",

    input: "textarea",
  }).then(function (res) {
    text = res.value.trim();

    console.log(text.length);
    if (text.length) {
      let data = { text, token };
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
    } else {
      swal({
        type: "failed",
        html: "please fill all input ",
      });
    }
  });
});
/////////////////////////////
document.getElementById("newsdel").addEventListener("click", () => {
  let text;
  swal({
    title: "Enter text addressfor delete ",

    input: "textarea",
  }).then(function (res) {
    text = res.value.trim();
    console.log(text.length);
    if (text && text.length) {
      let data = { text, token };
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
      swal({
        type: "success",
        html: "Your text: " + text,
      });
    } else {
      swal({
        type: "failed",
        html: "please fill all input ",
      });
    }
  });
});
newsfinddata();

// swal({
//   title: "Are you sure?",
//   text: "Some text.",
//   type: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#DD6B55",
//   confirmButtonText: "Yes!",
//   cancelButtonText: "No.",
// }).then(() => {
//   if (result.value) {
//     // handle Confirm button click
//   } else {
//     // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
//   }
// });

// swal({
//   title: "Enter email address",
//   input: "textarea",
//   html:
//     "You can use <b>bold text</b>, " +
//     '<a href="//sweetalert2.github.io">links</a> ' +
//     "and other HTML tags ",
// }).then(function (email) {
//   console.log(email.value);
//   swal({
//     type: "success",
//     html: "Your email: " + email.value,
//   });
// });
// console.log("Y", y);
document.getElementById("login").addEventListener("click", () => {
  let text;
  swal({
    title: "enter your password ",

    input: "text",
  }).then(function (res) {
    text = res.value.trim();
    console.log(text);
    if (text) {
      let data = { text };
      const req = new XMLHttpRequest();
      const baseUrl = "http://localhost:3000/login";
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
            console.log(nodedata.toke);
            localStorage.setItem("sandeep", nodedata.token);
            console.log(nodedata.token);
            swal({
              type: "success",
              html: "Your text: " + text,
            });
          } else {
            swal({
              type: "failed",
              html: "wrong password please fill correct ",
            });
          }
        }
      };
    }
  });
});
