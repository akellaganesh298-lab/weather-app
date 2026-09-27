import React from "react";

function Weather({ data }) {
    return (
        <div className="weather-card">
            <h2>{data.name}, {data.sys.country}</h2>
            <p>🌡 Temperature: {data.main.temp} °C</p>
            <p>☁ Condition: {data.weather[0].description}</p>
            <p>💨 Wind Speed: {data.wind.speed} m/s</p>
            <p>💧 Humidity: {data.main.humidity}%</p>
        </div>
    );
}

export default Weather;
