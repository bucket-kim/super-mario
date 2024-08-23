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
  };
};

export { WeatherModule };
