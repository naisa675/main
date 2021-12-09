const API_KEY = "m0dfzs9vlSgT1c8pBrrKne3UH8rg7FXSK1Ghxnag";
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

async function getWeather() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const { sol_keys, validity_checks, ...sols } = data;
  return Object.entries(sols).map(([sol, data]) => {
    return {
      sol,
      maxTemp: data.PRE.mx,
      minTemp: data.PRE.mn,
      date: new Date(data.First_UTC),
    };
  });
}

const currentSolElement = document.querySelector("[data-current-sol]");
const currentSolDateElement = document.querySelector("[data-current-sol-date]");
const currentSolMaxTemp = document.querySelector("[data-current-sol-max-temp]");
const currentSolMinTemp = document.querySelector("[data-current-sol-min-temp]");

const previousSolsContainer = document.querySelector("[data-previous-days]");
const previousSolsTemplate = document.querySelector(
  "[data-previous-day-template]"
);

const labelCelsius = document.querySelector("[data-unit-celsius]");
const labelFahrenheit = document.querySelector("[data-unit-fahrenheit]");
const inputCelsius = document.getElementById("c");
const inputFahrenheit = document.getElementById("f");

function updateTemp() {
  if (!inputCelsius.checked) {
    currentSolMaxTemp.innerText =  displayTemperature(((Number(currentSolMaxTemp.innerText) - 32) * 5/9));
    currentSolMinTemp.innerText =  displayTemperature(((Number(currentSolMinTemp.innerText) - 32) * 5/9));
  }
  if (!inputFahrenheit.checked) {
    currentSolMaxTemp.innerText =  displayTemperature(((Number(currentSolMaxTemp.innerText) * 9/5) + 32));
    currentSolMinTemp.innerText =  displayTemperature(((Number(currentSolMinTemp.innerText) * 9/5) + 32));

  }
}

labelCelsius.addEventListener("click", (event) => {
  if (!event.currentTarget.checked) {
    document
      .querySelectorAll(".temp-unit")
      .forEach((elem) => (elem.innerText = "C"));
    updateTemp();
  }
});
labelFahrenheit.addEventListener("click", (event) => {
  if (!event.currentTarget.checked) {
    document
      .querySelectorAll(".temp-unit")
      .forEach((elem) => (elem.innerText = "F"));
    updateTemp();
  }
});

function displayCurrentSol(sol) {
  let currentSol = sol;
  currentSolElement.innerText = currentSol.sol;
  currentSolDateElement.innerText = displayDate(currentSol.date);
  currentSolMaxTemp.innerText = displayTemperature(currentSol.maxTemp);
  currentSolMinTemp.innerText = displayTemperature(currentSol.minTemp);
}
function displayPreviousSols(sols) {
  previousSolsContainer.innerHTML = "";
  sols.forEach((solData, index) => {
    const solContainer = previousSolsTemplate.content.cloneNode(true);
    solContainer.querySelector("[data-sol]").innerText = solData.sol;
    solContainer.querySelector("[data-sol-date]").innerText = displayDate(
      solData.date
    );
    solContainer.querySelector(
      "[data-sol-max-temp]"
    ).innerText = displayTemperature(solData.maxTemp);
    solContainer.querySelector(
      "[data-sol-min-temp]"
    ).innerText = displayTemperature(solData.minTemp);
    solContainer
      .querySelector("a")
      .addEventListener("click", () => displayCurrentSol(sols[index]));
    previousSolsContainer.append(solContainer);
  });
}

getWeather()
  .then((sols) => {
    displayCurrentSol(sols[sols.length - 1]);
    displayPreviousSols(sols);
  })
  .catch((err) => {
    console.log(err);
  });

function displayTemperature(temperature) {
  return Math.round(temperature);
}

function displayDate(date) {
  return date.toLocaleDateString(undefined, { day: "numeric", month: "long" });
}

// Show Previous 7 Days Statistics
const showPreviousWeatherBtn = document.querySelector(
  ".show-previous-weather-label"
);
const previousWeatherContainer = document.querySelector(
  ".mars-previous-weather"
);
showPreviousWeatherBtn.addEventListener("click", () => {
  previousWeatherContainer.classList.toggle("show-weather");
});

let windArrow = document.querySelector('.wind__arrow');
// let increase = Number(getComputedStyle(windArrow).getPropertyValue('--direction').replace(/deg/g, ''))
setInterval(() => {
  // if(increase > 360){
  //   increase = 1;
  // }
  // increase += 15;
  let increase = Math.ceil(Math.random() * 360)
  windArrow.style = `--direction:${increase}deg;`;
}, 200);


console.log("%cCureently This Api not supporting Wind features that's why it's simply static for now","color:red; font-size:1rem; text-align:center;")
console.log("%chttps://github.com/mmestiyak","color:red; font-size:1rem; text-align:center;")
console.log("%chttps://twitter.com/mmestiyak","color:red; font-size:1rem; text-align:center;")
console.log("%chttps://facebook.com/mmestiyak","color:red; font-size:1rem; text-align:center;")