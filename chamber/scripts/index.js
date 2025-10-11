const currentyear = document.querySelector("#currentyear");
let lastModified = document.querySelector("#lastModified");
const hamButton = document.querySelector("#hamburgerMenu");
const navbar = document.querySelector(".navbar");

lastModified.innerHTML = new Date(document.lastModified);

const myCity = document.querySelector("#town");
const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#weatherGraphic");

const myKey = "8a7518de49b70f88576b68598516e351";
const myLat = "40.5219";
const myLong = "-111.9391"


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${myLat}&lon=${myLong}&cnt=${4}&appid=${myKey}&units=imperial`

async function makeRandomData() {
    const response = await fetch("./data/members.json");
    const data = await response.json();
    displayRandomBusinesses(data.businesses);
}

async function apiFetch(){
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayResults(data);
    }
}
async function weatherForcast() {
    const response = await fetch(url2);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

const displayRandomBusinesses = (businesses) => {
    const filteredbusinesses = businesses.filter(business => business.membershipLevel > 1)
    let numberDisplayed = 0;
    while (numberDisplayed < 3) {
        let RandomBusinessSelection = filteredbusinesses[Math.floor(Math.random() * (filteredbusinesses.length))];
        let gridSection = document.createElement("section");
        let businessName = document.createElement("h3");
        let businessAddress = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let webAddress = document.createElement("p");
        let image = document.createElement("img");
        let membershipLv = document.createElement("p");

        businessName.textContent = RandomBusinessSelection.name;
        businessAddress.textContent = `Address: ${RandomBusinessSelection.address}`;
        phoneNumber.textContent = `Phone Number: ${RandomBusinessSelection.phone}`;
        webAddress.textContent = `Web Address: ${RandomBusinessSelection.url}`;
        if (RandomBusinessSelection.membershipLevel == 2) {
            membershipLv.textContent = "Membership Level: Silver";
        } else {
            membershipLv.textContent = "Membership Level: Gold";
        }

        image.setAttribute("src", RandomBusinessSelection.icon);
        image.setAttribute("alt", `Image of ${RandomBusinessSelection.name}`);
        image.setAttribute("loading", "lazy");

        gridSection.appendChild(businessName);
        gridSection.appendChild(businessAddress);
        gridSection.appendChild(phoneNumber);
        gridSection.appendChild(webAddress);
        gridSection.appendChild(membershipLv);
        gridSection.appendChild(image);
        document.querySelector(".res-grid").appendChild(gridSection);
            
        numberDisplayed +=1;
    };
}

function displayResults(weatherInfo) {
    myDescription.innerHTML = weatherInfo.weather[0].description;
    myTemperature.innerHTML = `${weatherInfo.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
    myGraphic.setAttribute("src", iconsrc);
    myGraphic.setAttribute("alt", weatherInfo.weather[0].description);
}

makeRandomData();

apiFetch();

weatherForcast();