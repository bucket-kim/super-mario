export interface WeatherModuleTypes {
  isSunset: boolean;
  setIsSunset: (isSunset: boolean) => void;

  countryDayTime: number;
  setCountryDayTime: (countryDayTime: number) => void;

  currentWeather: null;
  setCurrentWeather: (currentWeather: null) => void;

  isCelsius: boolean;
  setIsCelsius: (isCelsius: boolean) => void;
}
