const apiKey = "your_api_key";

const currentUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

const searchBox = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

async function fetchWeatherAndForecast(city) {
  try {
    const currentRes = await fetch(`${currentUrl}&q=${city}&appid=${apiKey}`);
    if (!currentRes.ok) throw new Error("City not found.");
    const currentData = await currentRes.json();

    document.getElementById("city-name").innerText = currentData.name;
    document.getElementById("temperature").innerText = Math.round(currentData.main.temp) + "°";
    document.getElementById("main-icon").src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
    document.getElementById("real-feel").innerText = Math.round(currentData.main.feels_like) + "°";
    document.getElementById("wind-speed").innerText = currentData.wind.speed + " km/h";
    document.getElementById("chance-rain").innerText = `${currentData.clouds.all}%`;
    document.getElementById("humidity").innerText = `${currentData.main.humidity}%`;
    document.getElementById("rain-chance").innerText = `Chance of rain: ${currentData.clouds.all}%`;

    const condition = currentData.weather[0].main.toLowerCase();
    document.body.style.backgroundImage = `url('Images/${condition}.jpg')`;

    const forecastRes = await fetch(`${forecastUrl}?q=${city}&units=metric&appid=${apiKey}`);
    const forecastData = await forecastRes.json();

    const hourlyContainer = document.getElementById("hourly-forecast");
    hourlyContainer.innerHTML = "";

    for (let i = 0; i < 6; i++) {
      const entry = forecastData.list[i];
      const dt = new Date(entry.dt * 1000);
      const hour = dt.getHours().toString().padStart(2, '0');
      const icon = entry.weather[0].icon;
      const temp = Math.round(entry.main.temp);

      hourlyContainer.innerHTML += `
        <div class="text-center">
          <p>${hour}:00</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png" width="40" alt="icon">
          <p>${temp}°</p>
        </div>
      `;
    }

    const weeklyContainer = document.getElementById("weekly-forecast");
    weeklyContainer.innerHTML = "";

    const fixedForecast = [
      { day: "Sun", icon: "01d", tempDay: 30, tempNight: 22 },
      { day: "Mon", icon: "02d", tempDay: 28, tempNight: 21 },
      { day: "Tue", icon: "03d", tempDay: 27, tempNight: 20 },
      { day: "Wed", icon: "04d", tempDay: 25, tempNight: 19 },
      { day: "Thu", icon: "10d", tempDay: 26, tempNight: 20 },
      { day: "Fri", icon: "01d", tempDay: 29, tempNight: 21 },
      { day: "Sat", icon: "09d", tempDay: 24, tempNight: 18 },
    ];

    fixedForecast.forEach(day => {
      weeklyContainer.innerHTML += `
        <div class="col text-center">
          <p>${day.day}</p>
          <img src="https://openweathermap.org/img/wn/${day.icon}.png" width="50" alt="icon">
          <p>${day.tempDay}° / ${day.tempNight}°</p>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
    alert("⚠️ Could not load forecast.");
  }
}

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    fetchWeatherAndForecast(city);
    showSection("weather-section");
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) {
      fetchWeatherAndForecast(city);
      showSection("weather-section");
    }
  }
});

function showSection(id) {
  document.getElementById("weather-section").classList.add("d-none");
  document.getElementById("country-section").classList.add("d-none");
  document.getElementById(id).classList.remove("d-none");
}

document.getElementById("weather-tab").addEventListener("click", () => {
  showSection("weather-section");
});

document.getElementById("map-tab").addEventListener("click", () => {
  showSection("country-section");
  showCountryList();
});

const countryList = [
  "Afghanistan", "Argentina", "Australia", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bolivia", "Brazil",
  "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Cyprus", "Czech Republic", "Denmark",
  "Dominican Republic", "Ecuador", "Egypt", "Finland", "France", "Georgia", "Germany", "Greece", "Guatemala",
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan",
  "Kenya", "Korea", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Malaysia", "Malta", "Mexico",
  "Moldova, Republic of", "Morocco", "Myanmar", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Senegal", "Serbia", "Singapore", "Slovakia",
  "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Tanzania, United Republic of", "Thailand",
  "Tunisia", "Ukraine", "United Kingdom", "USA", "Venezuela", "Vietnam"
];

function showCountryList() {
  const container = document.getElementById('country-list');
  container.innerHTML = '';
  countryList.forEach(country => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <button class="btn btn-outline-light w-100 text-start" onclick="showCountryWeather('${country}')">
        ${country}
      </button>
    `;
    container.appendChild(col);
  });
}

async function showCountryWeather(country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    const capital = data[0].capital?.[0];
    if (!capital) {
      alert("⚠️ Capital city not found for this country.");
      return;
    }
    fetchWeatherAndForecast(capital);
    showSection("weather-section");
  } catch (err) {
    console.error(err);
    alert("⚠️ Could not fetch country info.");
  }
}

document.getElementById("settings-tab").addEventListener("click", () => {
  showSection("settings-section");
});

document.getElementById("theme-select").addEventListener("change", function () {
  const theme = this.value;
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    document.body.classList.remove("bg-light", "text-dark");
    document.body.classList.add("bg-dark", "text-white");

    document.querySelectorAll(".form-control, .form-select, .btn").forEach(el => {
      el.classList.remove("bg-light", "text-dark", "btn-light");
      el.classList.add("bg-dark", "text-white", "btn-outline-light");
    });
  } else {
    document.body.classList.remove("bg-dark", "text-white");
    document.body.classList.add("bg-light", "text-dark");

    document.querySelectorAll(".form-control, .form-select, .btn").forEach(el => {
      el.classList.remove("bg-dark", "text-white", "btn-outline-light");
      el.classList.add("bg-light", "text-dark", "btn-light");
    });
  }
});



// Apply stored theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.getElementById("theme-select").value = savedTheme;
  document.getElementById("theme-select").dispatchEvent(new Event("change"));
});

// Save theme on change
document.getElementById("theme-select").addEventListener("change", function () {
  localStorage.setItem("theme", this.value);
});
