// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const axios = require("axios");

// Create app
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 4000;


// Weather route
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.send("Please provide a city name");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    res.json({
      city: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].description
    });
  } catch (error) {
    res.status(404).json({ error: "City not found" });
  }
});
app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.json({ error: "City is required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const list = response.data.list;

    // Pick one forecast per day (12:00 PM)
    const dailyForecast = list.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    res.json(dailyForecast.slice(0, 5));
  } catch (err) {
    res.json({ error: "Unable to fetch forecast" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

