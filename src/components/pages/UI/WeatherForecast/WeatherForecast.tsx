import { FC } from "react";
import WeatherForecastStyleContainer from "./WeatherForecastStyleContainer";

interface ForecastProps {
  forecastWeather: any;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeatherForecast: FC<ForecastProps> = ({ forecastWeather }) => {
  const dayInWeek = new Date().getDay();

  const forecastDay = DAYS.slice(dayInWeek, DAYS.length).concat(
    DAYS.slice(0, dayInWeek),
  );

  return !forecastWeather ? null : (
    <WeatherForecastStyleContainer>
      <div className="forecast-container">
        {forecastWeather.list.slice(0, 7).map((data: any, index: number) => (
          <div key={index} className="weather-container">
            <div>
              <h1>{forecastDay[index]}</h1>
            </div>
            <div>
              <p>{data.weather[0].description}</p>
            </div>
          </div>
        ))}
      </div>
    </WeatherForecastStyleContainer>
  );
};

export default WeatherForecast;
