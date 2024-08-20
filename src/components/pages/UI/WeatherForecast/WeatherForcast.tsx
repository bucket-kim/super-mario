import { FC } from "react";

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

const WeatherForcast: FC<ForecastProps> = ({ forecastWeather }) => {
  const dayInWeek = new Date().getDay();

  const forecastDay = DAYS.slice(dayInWeek, DAYS.length).concat(
    DAYS.slice(0, dayInWeek),
  );

  return !forecastWeather
    ? null
    : forecastWeather.list.splice(0, 7).map((data: any, index: number) => (
        // console.log(data),

        <div key={index}>
          <div>
            <h1>{forecastDay[index]}</h1>
          </div>
          <div>
            <p>{data.weather[0].description}</p>
          </div>
        </div>
      ));
};

export default WeatherForcast;
