import { FC } from "react";
import WeatherStyleContainer from "./WeatherStyleContainer";

interface WeatherProps {
  currentWeather: any;
}

const Weather: FC<WeatherProps> = ({ currentWeather }) => {
  return currentWeather ? (
    <WeatherStyleContainer>
      <div className="weather-container">
        <div className="weather-place">
          <h2>
            {currentWeather.name} <br />
            {currentWeather.sys.country}
          </h2>
        </div>
        <div className="weather-temperature">
          <h2>
            {Math.round((currentWeather.main.temp - 273.15) * 100) / 100}°C
          </h2>
        </div>
        <div className="weather-icon">
          <h1>{currentWeather.weather[0].main}</h1>
        </div>
        <div className="weather-feel-like">
          <h2>
            Feels liks
            <br />
            {Math.round((currentWeather.main.feels_like - 273.15) * 100) / 100}
            °C
          </h2>
        </div>
        <div className="weather-details">
          <p>Wind</p>
          <p>Humidity</p>
          <p>Pressure</p>
        </div>
      </div>
    </WeatherStyleContainer>
  ) : null;
};

export default Weather;
