import gsap from "gsap";
import { FC, useCallback, useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../State/useGlobalState";
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

  const weatherForecastDivRef = useRef<HTMLDivElement>(null);

  const { clickForecastArrow } = useGlobalState((state) => {
    return {
      clickForecastArrow: state.clickForecastArrow,
    };
  }, shallow);

  const handleWeatherForecastAnim = useCallback(() => {
    if (!weatherForecastDivRef.current) return;
    if (clickForecastArrow) {
      gsap.fromTo(
        weatherForecastDivRef.current,
        {
          y: -30,
          opacity: 0,
          visibility: "hidden",
        },
        {
          opacity: 1,
          visibility: "visible",
          overwrite: true,
          duration: 0.25,
          y: 0,
        },
      );
    } else {
      gsap.to(weatherForecastDivRef.current, {
        y: -30,
        duration: 0.25,
        opacity: 0,
        overwrite: true,
        onComplete: () => {
          if (!weatherForecastDivRef.current) return;
          weatherForecastDivRef.current.style.visibility = "hidden";
        },
      });
    }
  }, [clickForecastArrow]);

  useEffect(handleWeatherForecastAnim, [handleWeatherForecastAnim]);

  // useEffect(() => {
  //   if (!forecastWeather) return;
  //   forecastWeather.list
  //     .slice(0, 7)
  //     .map((data: any) =>
  //       console.log(`${data.main.temp_max}, ${data.main.temp_min}`),
  //     );
  // }, [forecastWeather]);

  return !forecastWeather ? null : (
    <WeatherForecastStyleContainer ref={weatherForecastDivRef}>
      <div className="forecast-container">
        {forecastWeather.list.slice(0, 7).map((data: any, index: number) => (
          <div key={index} className="weather-container">
            <div className="weather-icon">
              <img
                src={`images/weatherui/${data.weather[0].icon}.png`}
                alt=""
              />
            </div>
            <div className="weather-description">
              <div>
                <h1>{forecastDay[index]}</h1>
              </div>

              <p>{Math.round((data.main.temp_max - 273.15) * 10) / 10} °C</p>
              <p>{Math.round((data.main.temp_min - 273.15) * 10) / 10} °C</p>
            </div>
          </div>
        ))}
      </div>
    </WeatherForecastStyleContainer>
  );
};

export default WeatherForecast;
