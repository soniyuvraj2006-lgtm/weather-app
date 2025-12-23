// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const axios = require("axios");

// Create app
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;


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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

