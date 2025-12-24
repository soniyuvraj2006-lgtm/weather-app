async function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");
  const loader = document.getElementById("loader");

  if (!city) {
    result.innerText = "Please enter a city";
    return;
  }

  result.innerText = "";
  loader.style.display = "block";

  try {
    const res = await fetch(`/weather?city=${city}`);
    const data = await res.json();

    loader.style.display = "none";

    result.innerText = `${data.city}: ${data.temperature}°C, ${data.weather}`;
  } catch (err) {
    loader.style.display = "none";
    result.innerText = "Error fetching weather";
  }
}

