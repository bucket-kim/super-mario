import { FC, useEffect } from "react";

interface ForecastProps {
  forecastWeather: any;
}

const WeatherForcast: FC<ForecastProps> = ({ forecastWeather }) => {
  useEffect(() => {
    console.log(forecastWeather);
  }, [forecastWeather]);

  return <div>WeatherForcast</div>;
};

export default WeatherForcast;
