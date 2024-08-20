import { useEffect, useState } from "react";
import { WEATHER_API_URL, weatherAPIKey } from "../../../api";
import datas from "../../../datas";
import ButtonInfos from "./ButtonInfos/ButtonInfos";
import Search from "./Search/Search";
import UIStyleContainer from "./UIStyleContainer";
import Weather from "./Weather/Weather";
import WeatherForcast from "./WeatherForecast/WeatherForcast";
const UI = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = async (searchData: string) => {
    if (!searchData) return;
    const { value } = searchData as unknown as { value: string };
    const { label } = searchData as unknown as { label: string };
    const [lat, lon] = value.split(" ");

    const weatherFetch = await fetch(
      `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`,
    );
    const forcastFetch = await fetch(
      `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`,
    );

    Promise.all([weatherFetch, forcastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forcastResponse = await res[1].json();

        setCurrentWeather({ city: label, ...weatherResponse });
        setForecastWeather({ city: label, ...forcastResponse });
      })
      .catch((error) => console.log(error));
  };

  const success = async (position: any) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const weatherFetch = await fetch(
      `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`,
    );
    const forcastFetch = await fetch(
      `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`,
    );

    Promise.all([weatherFetch, forcastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forcastResponse = await res[1].json();

        setCurrentWeather({ ...weatherResponse });
        setForecastWeather({ ...forcastResponse });
      })
      .catch((error) => console.log(error));
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return (
    <UIStyleContainer>
      {/* search UI */}
      <Search onSearchChange={handleOnSearchChange} />
      {/* weather UI */}
      <Weather currentWeather={currentWeather} />
      {/* forcast UI */}
      <WeatherForcast forecastWeather={forecastWeather} />
      {/* Stage Info UI */}
      {datas.map((data, index) => (
        <ButtonInfos data={data} key={index} />
      ))}
    </UIStyleContainer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default UI;
