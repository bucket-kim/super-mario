import { FC } from "react";
import Moon from "./Moon/Moon";
import Sun from "./Sun/Sun";

interface WeatherProps {
  isSunset: boolean;
}

const Weather: FC<WeatherProps> = ({ isSunset, ...props }) => {
  return (
    <group {...props}>
      {isSunset ? <Moon /> : <Sun position={[2.5, 3.5, -3]} scale={0.4} />}
    </group>
  );
};

export default Weather;
