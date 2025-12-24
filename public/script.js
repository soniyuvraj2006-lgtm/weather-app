async function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");
  const loader = document.getElementById("loader");
  const forecastDiv = document.getElementById("forecast");

  if (!city) {
    result.innerText = "Please enter a city";
    return;
  }

  result.innerText = "";
  forecastDiv.innerHTML = "";
  loader.style.display = "block";

  try {
    // Current weather
    const res = await fetch(`/weather?city=${city}`);
    const data = await res.json();

    // Forecast
    const forecastRes = await fetch(`/forecast?city=${city}`);
    const forecastData = await forecastRes.json();

    loader.style.display = "none";

    result.innerText =
      `${data.city}: ${data.temperature}°C, ${data.weather}`;

    // Render forecast cards
    forecastData.forEach(day => {
      const date = new Date(day.dt_txt).toDateString();
      const temp = Math.round(day.main.temp);

      const card = document.createElement("div");
      card.className = "forecast-card";
      card.innerHTML = `
        <div>${date}</div>
        <div>${temp}°C</div>
        <div>${day.weather[0].main}</div>
      `;

      forecastDiv.appendChild(card);
    });

  } catch (err) {
    loader.style.display = "none";
    result.innerText = "Error fetching weather";
  }
}

