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
      gsap.to(weatherForecastDivRef.current, {
        opacity: 1,
        visibility: "visible",
        overwrite: true,
        duration: 0.25,
        y: 0,
      });
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

  return !forecastWeather ? null : (
    <WeatherForecastStyleContainer ref={weatherForecastDivRef}>
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
