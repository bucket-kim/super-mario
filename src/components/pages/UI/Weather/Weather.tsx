import { FC, useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../State/useGlobalState";
import { handleArrowAnimation } from "./WeatherAnimationLogic";
import WeatherStyleContainer from "./WeatherStyleContainer";

interface WeatherProps {
  currentWeather: any;
}

const Weather: FC<WeatherProps> = ({ currentWeather }) => {
  const { clickForecastArrow, setClickForecastArrow } = useGlobalState(
    (state) => {
      return {
        clickForecastArrow: state.clickForecastArrow,
        setClickForecastArrow: state.setClickForecastArrow,
      };
    },
    shallow,
  );

  const arrowButtonRef = useRef<HTMLButtonElement>(null);

  const handleArrowClick = () => {
    if (clickForecastArrow === true) {
      setClickForecastArrow(false);
    } else {
      setClickForecastArrow(true);
    }
  };

  useEffect(() => {
    if (!arrowButtonRef.current) return;
    handleArrowAnimation(arrowButtonRef.current, clickForecastArrow);
  }, [clickForecastArrow]);

  return currentWeather ? (
    <WeatherStyleContainer>
      <div className="weather-content">
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
            <img
              src={`images/weatherui/${currentWeather.weather[0].icon}.png`}
              alt=""
            />
            {/* <h1>{currentWeather.weather[0].main}</h1> */}
          </div>
          <div className="weather-feel-like">
            <h2>
              Feels liks
              <br />
              {Math.round((currentWeather.main.feels_like - 273.15) * 100) /
                100}
              °C
            </h2>
          </div>
          <div className="weather-details">
            <p>Wind</p>
            <p>Humidity</p>
            <p>Pressure</p>
          </div>
        </div>
        <div className="weather-button">
          <button onClick={handleArrowClick} ref={arrowButtonRef}>
            <img src="/images/weatherui/arrow.png" alt="" />
          </button>
        </div>
      </div>
    </WeatherStyleContainer>
  ) : null;
};

export default Weather;
