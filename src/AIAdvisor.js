import React, { useState, useEffect } from "react";
import axios from "axios";

function AIAdvisor({ weatherData }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      if (!weatherData) return;

      try {
        const response = await axios.post("http://localhost:5000/api/ai", {
          messages: [
            {
              role: "system",
              content: "You are a helpful weather assistant. Summarize conditions in a friendly way."
            },
            {
              role: "user",
              content: `Weather data: 
                City: ${weatherData.name}, 
                Temp: ${weatherData.main.temp}°C, 
                Condition: ${weatherData.weather[0].description}, 
                Humidity: ${weatherData.main.humidity}%, 
                Wind: ${weatherData.wind.speed} m/s`
            }
          ]
        });
          setSummary(response.data.message);
      } catch (error) {
        console.error("AI summary error:", error);
      }
    };

    fetchSummary();
  }, [weatherData]);

  return (
    <div className="ai-summary">
      <h3>AI Weather Insight</h3>
    </div>
  );
}

export default AIAdvisor;
