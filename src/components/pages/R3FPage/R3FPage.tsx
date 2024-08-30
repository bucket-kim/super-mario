import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../State/useGlobalState";
import Camera from "./Camera/Camera";
import Lights from "./Lights/Lights";
import MarioModel from "./Mario/MarioModel";
import R3FPageStyleContainer from "./R3FPageStyleContainer";

interface Weather {
  weather: { main: string }[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const R3FPage = () => {
  const { isSunset, currentWeather } = useGlobalState((state) => {
    return {
      isSunset: state.isSunset,
      currentWeather: state.currentWeather,
    };
  }, shallow) as { isSunset: boolean; currentWeather: Weather | null };

  const colorRef = useRef<THREE.Color | null>(null);

  const [weatherBG, setWeatherBG] = useState("#88d2fa");

  useEffect(() => {
    if (!currentWeather) return;
    const weatherCondition = currentWeather.weather[0].main;
    console.log(weatherCondition);
    switch (weatherCondition) {
      case "Clear":
        setWeatherBG("#88d2fa");
        break;
      case "Clouds":
        setWeatherBG("#b7cbd6");
        break;
      case "Rain":
        setWeatherBG("#75a0b7");
        break;
      case "Snow":
        setWeatherBG("#b7cbd6");
        break;
    }
  }, [currentWeather]);

  return (
    <R3FPageStyleContainer>
      <Canvas
        shadows
        gl={{ antialias: false }}
        camera={{ position: [0, 4, 12], fov: 35 }}
        dpr={[1, 2]}
      >
        {/* <fog attach="fog" args={["#c9e5f6", 10, 80]} /> */}
        <color
          attach="background"
          args={[isSunset ? "#08223f" : weatherBG]}
          ref={colorRef}
        />

        <Camera />
        <Lights />
        <MarioModel position={[0, 0, 0]} />
      </Canvas>
    </R3FPageStyleContainer>
  );
};

export default R3FPage;
