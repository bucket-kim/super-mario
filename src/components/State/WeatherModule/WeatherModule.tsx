import { globalStateApiType } from "../GlobalStateTypes";

const WeatherModule = ({ set }: globalStateApiType) => {
  return {
    isSunset: false,
    setIsSunset: (isSunset: boolean) => {
      set({ isSunset: isSunset });
    },

    countryDayTime: 0,
    setCountryDayTime: (countryDayTime: number) => {
      set({ countryDayTime: countryDayTime });
    },

    currentWeather: null,
    setCurrentWeather: (currentWeather: null) => {
      set({ currentWeather: currentWeather });
    },

    forecastWeather: null,
    setForecastWeather: (forecastWeather: null) => {
      set({ forecastWeather: forecastWeather });
    },

    isCelsius: false,
    setIsCelsius: (isCelsius: boolean) => {
      set({ isCelsius: isCelsius });
    },
  };
};

export { WeatherModule };
