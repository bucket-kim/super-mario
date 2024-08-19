import { FC, useEffect } from "react";

interface WeatherProps {
  currentWeather: any;
}

const Weather: FC<WeatherProps> = ({ currentWeather }) => {
  useEffect(() => {
    console.log(currentWeather);
  }, [currentWeather]);

  return currentWeather ? (
    <div>
      <h1>
        {currentWeather.name}, {currentWeather.sys.country}
      </h1>
      <h1>{currentWeather.weather[0].main}</h1>
      <h2>{Math.round((currentWeather.main.temp - 273.15) * 100) / 100}°C</h2>
      <p>
        Feels liks{" "}
        {Math.round((currentWeather.main.feels_like - 273.15) * 100) / 100}°C
      </p>
      <p>Wind</p>
      <p>Humidity</p>
      <p>Pressure</p>
    </div>
  ) : null;
};

export default Weather;
