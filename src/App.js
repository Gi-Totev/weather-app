import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);

  const search = async (e) => {
    if (e && e?.key && e.key !== "Enter") return;
    if (error) setError(false);

    try {
      const data = await fetchWeather(query);
      setWeather(data);
    } catch (error) {
      setError(`Couldn't find weather for ${query}`);
    }
    setQuery("");
  };

  return (
    <div className="main-container">
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        className="search"
        placeholder="Enter City and press Enter..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
