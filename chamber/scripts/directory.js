const currentyear = document.querySelector("#currentyear");
let lastModified = document.querySelector("#lastModified");
const hamButton = document.querySelector("#hamburgerMenu");
const navbar = document.querySelector(".navbar");
const classFilters = document.querySelector(".classFilters");
const allClasses = document.querySelector("#all");
const cse = document.querySelector("#cse");
const wdd = document.querySelector("#wdd");

currentyear.innerHTML = new Date().getFullYear();
lastModified.innerHTML = new Date(document.lastModified);
hamButton.addEventListener("click", () => {
    navbar.classList.toggle("show");
    hamButton.classList.toggle("show");
});

async function getData() {
    const response = await fetch("./data/members.json");
    const data = await response.json();
    displayBusinesses(data.businesses);
};
const displayBusinesses = (businesses) => {
    businesses.forEach((business) => {
        let gridSection = document.createElement("section");
        let businessName = document.createElement("h3");
        let businessAddress = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let webAddress = document.createElement("p");
        let image = document.createElement("img");
        let membershipLv = document.createElement("p");

        businessName.textContent = business.name;
        businessAddress.textContent = `Address: ${business.address}`;
        phoneNumber.textContent = `Phone Number: ${business.phone}`;
        webAddress.textContent = `Web Address: ${business.url}`;
        membershipLv.textContent = `Membership Level: ${business.membershipLevel}`;

        image.setAttribute("src", business.icon);
        image.setAttribute("alt", `Image of ${business.name}`);
        image.setAttribute("loading", "lazy");

        gridSection.appendChild(businessName);
        gridSection.appendChild(businessAddress);
        gridSection.appendChild(phoneNumber);
        gridSection.appendChild(webAddress);
        gridSection.appendChild(membershipLv);
        gridSection.appendChild(image);
        document.querySelector(".res-grid").appendChild(gridSection);
    });
};
getData();