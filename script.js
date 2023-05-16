let API = "http://localhost:8000/KPI";

let name = document.querySelector("#name");
let surname = document.querySelector("#surname");
let number = document.querySelector("#number");
let week1 = document.querySelector("#week1");
let week2 = document.querySelector("#week2");
let week3 = document.querySelector("#week3");
let week4 = document.querySelector("#week4");
let studentList = document.querySelector(".student-list");
let saveId = 0;

// modal
let btnAdd = document.querySelector(".btn-add");
let btnSave = document.querySelector(".btn-save");
let closeBtn = document.querySelector(".close-modal");
let modal = document.querySelector(".modal");
let btnAddModal = document.querySelector(".add-student");
let modalTitle = document.querySelector(".modal-title");

// info-modal
let infoModal = document.querySelector(".table-style");
let tableInfo = document.querySelector(".table-info");
let closeTable = document.querySelector(".close-table");

// pagination
let count = 1;
let totalCount = 1;
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let pagList = document.querySelector(".pag-list");

// search
let inpSearch = document.querySelector(".inp-search");
let btnSearch = document.querySelector(".btn-search");
let searchVal = "";
//? добавление-----------------------------------------------------
// search
btnSearch.addEventListener("click", () => {
  searchVal = inpSearch.value;
  render();
});

// открытие модалки
btnAddModal.addEventListener("click", () => {
  modal.style.display = "flex";

  btnAdd.style.display = "block";
  btnSave.style.display = "none";
  modalTitle.innerText = "New student";

  name.value = "";
  surname.value = "";
  number.value = "";
  week1.value = "";
  week2.value = "";
  week3.value = "";
  week4.value = "";
});
// закрытие модалки
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

btnAdd.addEventListener("click", async function () {
  if (!name.value.trim() || !surname.value.trim() || !number.value.trim()) {
    alert("Заполните первые 3 поля");
  }
  let obj = {
    name: name.value,
    surname: surname.value,
    number: number.value,
    week1: week1.value,
    week2: week2.value,
    week3: week3.value,
    week4: week4.value,
  };

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });

  name.value = "";
  surname.value = "";
  number.value = "";
  week1.value = "";
  week2.value = "";
  week3.value = "";
  week4.value = "";
  modal.style.display = "none";

  render();
});

//отображение-------------------------------------------------------------------
async function render() {
  let res = await fetch(`${API}?q=${searchVal}&_page=${count}&_limit=4`);
  let data = await res.json();
  paginationFunc();

  //   console.log(data);
  studentList.innerHTML = "";
  data.forEach((element) => {
    studentList.innerHTML += `<div class="items"><h3 class="item-name">${element.name}</h3> <div class="btn-list"><button class="btn-info" id="${element.id}">Info</button><button class="btn-edit" id="${element.id}">Edit</button><button class="btn-delete" id="${element.id}">Delete</button></div></div>`;
  });

  // info-modal-----------------
  let btnInfo = document.querySelectorAll(".btn-info");
  btnInfo.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.id;
      info(id);
    });
  });
  //   delete
  let btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.id;
      delItem(id);
    });
  });
  //   edit
  let btnEdit = document.querySelectorAll(".btn-edit");
  btnEdit.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.id;
      edit(id);
    });
  });
}
// info-modal
async function info(id) {
  infoModal.style.display = "block";
  let res = await fetch(`${API}/${id}`);
  let data = await res.json();
  tableInfo.innerHTML = `
    <table style ="width:100%">
    <tr>
    <td>ФИО</td>
    <td>${data.surname} ${data.name} </td>
  </tr>
  <tr>
    <td>Номер телефона</td>
    <td>${data.number} </td>
  </tr>
  <tr>
    <td>First week KPI</td>
    <td>${data.week1} </td>
  </tr>
  <tr>
    <td>Second week KPI</td>
    <td>${data.week2}</td>
  </tr>
  <tr>
    <td>Third week KPI</td>
    <td>${data.week3}</td>
  </tr>
  <tr>
    <td>Fourth week KPI</td>
    <td>${data.week4}</td>
  </tr>
  <tr>
    <td>mounth KPI</td>
    <td>${+data.week1 + +data.week2 + +data.week3 + +data.week4}</td>
  </tr>
  </table>`;
}
//   закрытие инфо-модал
closeTable.addEventListener("click", () => {
  infoModal.style.display = "none";
});
render();

// delete
async function delItem(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}

// edit
async function edit(id) {
  modal.style.display = "flex";
  btnAdd.style.display = "none";
  btnSave.style.display = "block";
  modalTitle.innerText = "Edit student";

  let res = await fetch(`${API}/${id}`);
  let data = await res.json();

  name.value = data.name;
  surname.value = data.surname;
  number.value = data.number;
  week1.value = data.week1;
  week2.value = data.week2;
  week3.value = data.week3;
  week4.value = data.week4;

  saveId = id;
  btnSave.addEventListener("click", () => {
    save(saveId);
  });
}
async function save(id) {
  let obj = {
    name: name.value,
    surname: surname.value,
    number: number.value,
    week1: week1.value,
    week2: week2.value,
    week3: week3.value,
    week4: week4.value,
  };
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  modal.style.display = "none";
  render();
}

// pagination
async function paginationFunc() {
  let res = await fetch(`${API}?q=${searchVal}`);
  let data = await res.json();
  totalCount = Math.ceil(data.length / 4);
  pagList.innerHTML = "";
  for (let i = 1; i <= totalCount; i++) {
    if (count == i) {
      pagList.innerHTML += `<p class="page-num active">${i}</p>`;
    } else {
      pagList.innerHTML += `<p class="page-num">${i}</p>`;
    }
  }
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-num")) {
    count = e.target.innerText;
    render();
  }
});

prev.addEventListener("click", () => {
  if (count <= 1) {
    return;
  }
  count--;
  render();
});
next.addEventListener("click", () => {
  if (count >= totalCount) {
    return;
  }
  count++;
  render();
});
