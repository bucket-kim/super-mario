import { FC, useCallback, useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../State/useGlobalState";
import { handleArrowAnimation } from "./WeatherAnimationLogic";
import WeatherStyleContainer from "./WeatherStyleContainer";

interface WeatherProps {
  currentWeather: any;
}

const Weather: FC<WeatherProps> = ({ currentWeather }) => {
  const {
    clickForecastArrow,
    setClickForecastArrow,
    setIsSunset,
    setShowSearch,
    showSearch,
  } = useGlobalState((state) => {
    return {
      clickForecastArrow: state.clickForecastArrow,
      setClickForecastArrow: state.setClickForecastArrow,
      setIsSunset: state.setIsSunset,
      setShowSearch: state.setShowSearch,
      showSearch: state.showSearch,
    };
  }, shallow);

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

  const handleIsSunsetCondition = useCallback(() => {
    if (!currentWeather) return;
    const currentTime = Math.floor(Date.now() / 1000) + currentWeather.timezone;
    // const currentTime = currentWeather.dt + currentWeather.timezone;
    const sunsetTime = currentWeather.sys.sunset + currentWeather.timezone;
    const sunriseTime = currentWeather.sys.sunrise + currentWeather.timezone;
    if (currentTime >= sunsetTime || currentTime < sunriseTime) {
      setIsSunset(true);
    } else {
      setIsSunset(false);
    }
  }, [currentWeather, setIsSunset]);

  useEffect(handleIsSunsetCondition, [handleIsSunsetCondition]);

  const formatUnixTimestamp = (unixTimestamp: number) => {
    // Convert Unix timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Extract hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    // Return formatted time as HH:MM:SS
    return (
      <p>
        {hours}:{minutes} {parseInt(hours) >= 12 ? "PM" : "AM"}
      </p>
    );
  };

  const handleMarkerClick = useCallback(() => {
    if (showSearch === false) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [showSearch]);

  return currentWeather ? (
    <WeatherStyleContainer>
      <div className="weather-content">
        <div className="weather-container">
          <div className="weather-place">
            <h2>
              <span className="condition">
                {currentWeather.weather[0].main}
              </span>
              <span className="temperature">
                {Math.round((currentWeather.main.temp - 273.15) * 10) / 10}°C
              </span>
              <span className="city">
                {currentWeather.name}
                <button onClick={handleMarkerClick}>
                  <img src="/images/UI/map-marker.svg" alt="" />
                </button>
              </span>
            </h2>
          </div>
          <div className="weather-icon">
            <img
              src={`images/weatherui/${currentWeather.weather[0].icon}.png`}
              alt=""
            />
            {/* <h1>{currentWeather.weather[0].main}</h1> */}
          </div>

          <div className="weather-details">
            <p>
              <span>Wind</span>
              <span>{currentWeather.wind.speed} km/h</span>
            </p>
            <p>
              <span>Humidity</span>
              <span>{currentWeather.main.humidity} %</span>
            </p>
            <p>
              <span>Pressure</span>
              <span>{currentWeather.main.pressure} mb</span>
            </p>
            <div className="sunrise-timing">
              <span>
                {formatUnixTimestamp(
                  currentWeather.sys.sunrise + currentWeather.timezone,
                )}
                <img src="/images/weatherui/sunrise.png" alt="" />
              </span>
              <span>
                {formatUnixTimestamp(
                  currentWeather.sys.sunset + currentWeather.timezone,
                )}
                <img src="/images/weatherui/sunset.png" alt="" />
              </span>
            </div>
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
