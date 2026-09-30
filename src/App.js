import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Weather from "./Weather";
import AIAdvisor from "./AIAdvisor";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "a4ea847092e29e5c417a32e65d868947"; // replace with your key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      alert("City not found!");
    }
  };

  const fetchWeatherForCities = useCallback(async () => {
    const cities = ["Amalapuram", "Rajamahendravaram", "Kakinada", "Hyderabad", "Mumbai"];
    const results = await Promise.all(
      cities.map((city) =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      )
    );
    setWeatherData(results.map((r) => r.data));
  }, []);

  useEffect(() => {
    fetchWeatherForCities();
  }, [fetchWeatherForCities]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weatherData ? (
        <>
          <Weather data={weatherData} />
          <AIAdvisor weatherData={weatherData} />
        </>
      ) : null}
    </div>
  );
}

export default App;
