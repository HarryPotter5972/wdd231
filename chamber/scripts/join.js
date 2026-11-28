const currentyear = document.querySelector("#currentyear");
let lastModified = document.querySelector("#lastModified");
const hamButton = document.querySelector("#hamburgerMenu");
const navbar = document.querySelector(".navbar");
lastModified.innerHTML = new Date(document.lastModified);
currentyear.innerHTML = new Date().getFullYear();
hamButton.addEventListener("click", () => {
    navbar.classList.toggle("show");
    hamButton.classList.toggle("show");
});
document.getElementById("myForm").addEventListener("submit", function () {
    document.getElementById("timestamp").value = new Date().toISOString();
});

const modal = document.querySelector("#myModal");
const openModal = document.querySelector("open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
    modal.showModal();
});
closeModal.addEventListener("click", () => {
    modal.close();
});
const params = new URLSearchParams(window.location.search);
console.log(params);
const fname = params.get("firstName");
const lname = params.get("lastName");
const email = params.get("email");
const orgname = params.get("organization-name");