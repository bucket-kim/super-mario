import { FC, useCallback, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../State/useGlobalState";
import WeatherStyleContainer from "./WeatherStyleContainer";

interface WeatherProps {
  currentWeather: any;
}

const Weather: FC<WeatherProps> = ({ currentWeather }) => {
  const { setIsSunset, isCelsius, setIsCelsius } = useGlobalState((state) => {
    return {
      setIsSunset: state.setIsSunset,
      isCelsius: state.isCelsius,
      setIsCelsius: state.setIsCelsius,
    };
  }, shallow);

  const handleCelsiusTemp = () => {
    setIsCelsius(true);
  };
  const handleFarenheitTemp = () => {
    setIsCelsius(false);
  };

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

  // const formatUnixTimestamp = (unixTimestamp: number) => {
  //   // Convert Unix timestamp to milliseconds
  //   const date = new Date(unixTimestamp * 1000);

  //   // Extract hours, minutes, and seconds
  //   const hours = date.getUTCHours().toString().padStart(2, "0");
  //   const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  //   // Return formatted time as HH:MM:SS
  //   return (
  //     <p>
  //       {hours}:{minutes} {parseInt(hours) >= 12 ? "PM" : "AM"}
  //     </p>
  //   );
  // };

  return currentWeather ? (
    <WeatherStyleContainer>
      <div className="weather-container">
        <div className="weather-top">
          <div className="city">
            <p>{currentWeather.name}</p>

            <img src="/images/UI/map-marker.svg" alt="" />
          </div>
          <div className="weather-icon">
            <img
              src={`images/weatherui/${currentWeather.weather[0].icon}.png`}
              alt=""
            />
          </div>
        </div>
        <div className="weather-mid">
          <div className="temperature">
            <h1>
              {isCelsius
                ? Math.round(currentWeather.main.temp - 273.15)
                : Math.round((currentWeather.main.temp - 273.15) * 1.8 + 32)}
              °
            </h1>
          </div>
          <div className="weather-details">
            <div className="condition">
              <p>
                {currentWeather.weather[0].main === "Smoke"
                  ? "Wind"
                  : currentWeather.weather[0].main}
              </p>
            </div>
            <div className="temp-high-low">
              <p>
                <span>
                  H:{" "}
                  {isCelsius
                    ? Math.round(currentWeather.main.temp_max - 273.15)
                    : Math.round(
                        (currentWeather.main.temp_max - 273.15) * 1.8 + 32,
                      )}
                  °
                </span>
                {"  "}
                <span>
                  L:{" "}
                  {isCelsius
                    ? Math.round(currentWeather.main.temp_min - 273.15)
                    : Math.round(
                        (currentWeather.main.temp_min - 273.15) * 1.8 + 32,
                      )}
                  °
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="weather-bottom">
          <div className="temp-unit">
            <button onClick={handleCelsiusTemp}>C</button>
            <span>/</span>
            <button onClick={handleFarenheitTemp}>F</button>
          </div>
          {/* <div className="sunrise-timing">
            <span>
              <img src="/images/weatherui/sunrise.png" alt="" />
              {formatUnixTimestamp(
                currentWeather.sys.sunrise + currentWeather.timezone,
              )}
            </span>
            <span>
              <img src="/images/weatherui/sunset.png" alt="" />
              {formatUnixTimestamp(
                currentWeather.sys.sunset + currentWeather.timezone,
              )}
            </span>
          </div> */}
        </div>
      </div>
    </WeatherStyleContainer>
  ) : null;
};

export default Weather;
