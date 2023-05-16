let API = "http://localhost:8000/KPI";

let name = document.querySelector("#name");
let surname = document.querySelector("#surname");
let number = document.querySelector("#number");
let week1 = document.querySelector("#week1");
let week2 = document.querySelector("#week2");
let week3 = document.querySelector("#week3");
let week4 = document.querySelector("#week4");

// modal
let btnAdd = document.querySelector(".btn-add");
let closeBtn = document.querySelector(".close-modal");
let modal = document.querySelector(".modal");
let btnAddModal = document.querySelector(".add-student");

// добавление
btnAdd.addEventListener("click", async function () {
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
});
// открытие модалки
btnAddModal.addEventListener("click", () => {
  modal.style.display = "flex";
});
// закрытие модалки
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
