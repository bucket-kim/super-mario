import { FC, Fragment, useRef } from "react";
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
  const forcastContainerDivRef = useRef<(HTMLDivElement | null)[]>([]);
  // const arrowButtonRef = useRef<HTMLButtonElement>(null);

  // const [clickForecastArrow, setClickForecastArrow] = useState(false);
  // const [showForecast, setShowForecast] = useState(false);

  const { isCelsius } = useGlobalState((state) => {
    return {
      isCelsius: state.isCelsius,
    };
  }, shallow);

  // const handleArrowClick = () => {
  //   setClickForecastArrow((prev) => !prev);
  // };

  // useEffect(() => {
  //   if (!arrowButtonRef.current) return;
  //   // const height = weatherForecastDivRef.current.getBoundingClientRect().height;
  //   handleArrowAnimation(
  //     arrowButtonRef.current,
  //     clickForecastArrow,
  //     setShowForecast((prev) => !prev),
  //   );
  // }, [clickForecastArrow]);

  // useEffect(() => {
  //   if (!forcastContainerDivRef.current) return;

  //   if (showForecast) {
  //     gsap.to(forcastContainerDivRef.current, {
  //       stagger: 0.15,

  //       opacity: 1,
  //       visibility: "visible",
  //     });
  //   } else {
  //     gsap.to(forcastContainerDivRef.current, {
  //       stagger: 0.15,

  //       opacity: 0,
  //       onComplete: () => {
  //         forcastContainerDivRef.current.forEach((el) => {
  //           if (!el) return;
  //           el.style.visibility = "hidden";
  //         });
  //       },
  //     });
  //   }
  // }, [showForecast]);

  return !forecastWeather ? null : (
    <Fragment>
      <WeatherForecastStyleContainer ref={weatherForecastDivRef}>
        <div className="forecast-header">
          <p>3-Day Forecast</p>
          {/* <ArrowSign ref={arrowButtonRef} handleArrowClick={handleArrowClick} /> */}
        </div>

        <div className="forecast-container">
          {forecastWeather.list.slice(0, 3).map((data: any, index: number) => (
            <div
              key={index}
              className="weather-container"
              ref={(el) => (forcastContainerDivRef.current[index] = el)}
            >
              <div className="weather-date">
                <p>{forecastDay[index].slice(0, 3)}</p>
              </div>
              <div className="weather-icon">
                <img
                  src={`images/weatherui/${data.weather[0].icon}.png`}
                  alt=""
                />
              </div>
              <div className="weather-description">
                <p>
                  {isCelsius
                    ? Math.round(data.main.temp_max - 273.15)
                    : Math.round(
                        (data.main.temp_max - 273.15) * (9 / 5) + 32,
                      )}{" "}
                  {isCelsius ? "°C" : "°F"}
                </p>
                /
                <p>
                  {isCelsius
                    ? Math.round(data.main.temp_min - 273.15)
                    : Math.round(
                        (data.main.temp_min - 273.15) * (9 / 5) + 32,
                      )}{" "}
                  {isCelsius ? "°C" : "°F"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </WeatherForecastStyleContainer>
    </Fragment>
  );
};

export default WeatherForecast;
