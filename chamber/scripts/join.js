const currentyear = document.querySelector("#currentyear");
let lastModified = document.querySelector("#lastModified");
const hamButton = document.querySelector("#hamburgerMenu");
const navbar = document.querySelector(".navbar");
lastModified.innerHTML = new Date(document.lastModified);
currentyear.innerHTML = new Date().getFullYear();