const currentyear = document.querySelector("#currentyear");
let lastModified = document.querySelector("#lastModified");
const hamButton = document.querySelector("#hamburgerMenu");
const navbar = document.querySelector(".navbar");
hamButton.addEventListener("click", () => {
    navbar.classList.toggle("show");
    hamButton.classList.toggle("show");
});

lastModified.innerHTML = new Date(document.lastModified);

const myCity = document.querySelector("#town");
const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#weatherGraphic");

const myKey = "8a7518de49b70f88576b68598516e351";
const myKey2 = "f937a4b5eeea331c9e7b7ef6b99362cb";
const myLat = "40.5219";
const myLong = "-111.9391";


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${myLat}&lon=${myLong}&cnt=5&appid=${myKey2}&units=imperial`;

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
        forecastResults(data);
    }
}

const displayRandomBusinesses = (businesses) => {
    const filteredbusinesses = businesses.filter(business => business.membershipLevel > 1)
    let numberDisplayed = 0;
    while (numberDisplayed < 3) {
        let RandomBusinessSelection = filteredbusinesses[Math.floor(Math.random() * (filteredbusinesses.length))];
        let gridSection = document.createElement("section");
        let sectionDiv = document.createElement("div");
        sectionDiv.classList.add("sectionDiv");
        let businessName = document.createElement("h3");
        let businessAddress = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let webAddress = document.createElement("p");
        let image = document.createElement("img");
        image.classList.add("directoryImg")
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
        gridSection.appendChild(sectionDiv);
        sectionDiv.appendChild(businessAddress)
        sectionDiv.appendChild(phoneNumber);
        sectionDiv.appendChild(webAddress);
        sectionDiv.appendChild(membershipLv);
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
    myGraphic.setAttribute("loading", "lazy");
}

function forecastResults(forecastInfo) {
    let index = 1;
    const days = ["Tomorrow", "Overmorrow", "Day after Overmorrow", "3 Days after Tomorrow"];
    let daysIndex = 0;
    while (index < 5) {
        let forecastSection = document.createElement("section");
        let forecastHeader = document.createElement("h3");
        let forecastImg = document.createElement("img");
        let forecastDescription = document.createElement("p");
        let forecastTemperature = document.createElement("p");
        let imgSrc = `https://openweathermap.org/img/wn/${forecastInfo.list[index].weather[0].icon}@2x.png`;
        
        forecastImg.id = "weatherGraphic";
        forecastDescription.id = "description";
        forecastTemperature.id = "temperature";

        forecastHeader.innerHTML = `${days[daysIndex]}`;
        forecastDescription.innerHTML = forecastInfo.list[index].weather[0].description;
        forecastTemperature.innerHTML = `${forecastInfo.list[index].temp.day}&deg;F`;

        forecastImg.setAttribute("src", imgSrc);
        forecastImg.setAttribute("alt", forecastInfo.list[index].weather[0].description);
        forecastImg.setAttribute("loading", "lazy");
        
        forecastSection.appendChild(forecastHeader);
        forecastSection.appendChild(forecastImg);
        forecastSection.appendChild(forecastDescription);
        forecastSection.appendChild(forecastTemperature);
        document.querySelector(".forcast").appendChild(forecastSection);
        
        index +=1;
        daysIndex +=1;
    }

}
makeRandomData();

apiFetch();

weatherForcast();