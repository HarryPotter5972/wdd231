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
const submit = document.querySelector("#timestamp");
if (submit) {
    document.getElementById("myForm").addEventListener("submit", function () {
        document.getElementById("timestamp").value = new Date().toISOString();
    });
    const modal = document.querySelector("#myModal");
    const openModal = document.querySelector(".open-button");
    const closeModal = document.querySelector(".close-button");
    openModal.addEventListener("click", () => {
        modal.showModal();
    });
    closeModal.addEventListener("click", () => {
        modal.close();
    });
}


const params = new URLSearchParams(window.location.search);
console.log(params);
const fname = params.get("firstName");
const lname = params.get("lastName");
const email = params.get("email");
const orgname = params.get("organization-name");


const sectionHeadTwo = document.createElement("h2");
const sectionParagraph = document.createElement("p");
sectionHeadTwo.textContent = "Form Submitted";
sectionParagraph.innerHTML = `Thank you for your submittion, ${params.get("firstName")} ${params.get("lastName")} of the organization ${params.get("organization-name")}. Your email is ${params.get("email")} and your phone number is ${params.get("mobilePhone")}.`;
document.querySelector("#results").appendChild(sectionHeadTwo);
document.querySelector("#results").appendChild(sectionParagraph);