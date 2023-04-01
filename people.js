let main = document.getElementById("main");
let fun = function () {
  const req = new XMLHttpRequest();
  const baseUrl = "https://polymer.adaptable.app/peoplefind";
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
        document.getElementById("plus").style.visibility = "visible";
        document.getElementById("del").style.visibility = "visible";
      }

      nodedata.t.forEach((image) => {
        console.log(image);
        let br = document.createElement("br");

        let one_third = document.createElement("div");
        one_third.setAttribute("class", "one_third");
        let a = document.createElement("a");
        let img = document.createElement("img");
        img.setAttribute("class", "frame");

        img.src = `data:image/${image.contentType};base64,${image.x}`;
        a.append(img);
        one_third.append(a);
        main.append(one_third);
        //////////////////////
        let two_third = document.createElement("div");
        two_third.setAttribute("class", "two_third last");

        let h4 = document.createElement("h4");

        h4.setAttribute("class", "people");
        two_third.append(br);
        two_third.append(br);
        h4.append(image.name);
        two_third.append(h4);
        let i = document.createElement("i");
        i.append(image.member);
        two_third.append(i);
        let div1 = document.createElement("div");
        div1.setAttribute("class", "wie");
        let t = document.createElement("t");
        t.append(image.desc);
        div1.append(t);
        two_third.append(div1);
        let table = document.createElement("tbody");
        let tr1 = document.createElement("tr");
        let td11 = document.createElement("td");
        let td12 = document.createElement("td");
        td12.setAttribute("class", "info_left");
        td11.append("Email :");
        td12.append(image.email);
        tr1.append(td11);
        tr1.append(td12);
        table.append(tr1);
        let tr2 = document.createElement("tr");
        let td21 = document.createElement("td");
        let td22 = document.createElement("td");
        td22.setAttribute("class", "info_left");
        td21.append("Education:");
        td22.append(image.education);
        tr2.append(td21);
        tr2.append(td22);
        table.append(tr2);
        let tr3 = document.createElement("tr");
        let td31 = document.createElement("td");
        let td32 = document.createElement("td");
        td32.setAttribute("class", "info_left");
        td31.append("Current Research:");
        td32.append(image.curresearch);
        tr3.append(td31);
        tr3.append(td32);
        table.append(tr3);
        let tr4 = document.createElement("tr");
        let td4 = document.createElement("td");
        let a4 = document.createElement("a");
        a4.setAttribute("id", "anweshacv");
        a4.href = image.resume;
        a4.append("Resume");
        td4.append(a4);
        tr4.append(td4);
        table.append(tr4);
        let main_table = document.createElement("table");
        main_table.append(table);
        two_third.append(main_table);
        main.append(two_third);

        main.append(br);
        br.setAttribute("class", "clear");
        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        main.append(br);
        main.append(br1);
        main.append(br2);
      });
    }
  };
};
fun();

document.getElementById("del").addEventListener("click", () => {
  //let text = prompt("heading", "");
  let text;
  swal({
    title: "Enter Name for delete ",

    input: "textarea",
  }).then(function (res) {
    text = res.value.trim();

    console.log(text.length);
    if (text.length) {
      let token = localStorage.getItem("sandeep");
      let data = { text, token };
      const req = new XMLHttpRequest();
      const baseUrl = "https://polymer.adaptable.app/peopledel";
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
