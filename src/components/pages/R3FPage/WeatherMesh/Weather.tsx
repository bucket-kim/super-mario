import { useGLTF } from "@react-three/drei";
import { FC } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import Cloud from "./Cloud/Cloud";
import Moon from "./Moon/Moon";
import Sun from "./Sun/Sun";

interface WeatherProps {
  isSunset: boolean;
  currentWeather: any;
}

type GLTFResult = GLTF & {
  nodes: {
    moon_geo: THREE.Mesh;
    cloud001_geo: THREE.Mesh;
    cloud002_geo: THREE.Mesh;
  };
};

const Weather: FC<WeatherProps> = ({ isSunset, currentWeather, ...props }) => {
  const { nodes } = useGLTF(
    "/models/weatherModel.glb",
  ) as unknown as GLTFResult;
  return (
    <group {...props}>
      {isSunset ? (
        <Moon nodes={nodes} />
      ) : (
        <Sun position={[2.5, 3.5, -3]} scale={0.4} />
      )}
      {currentWeather.weather[0].main === "Clouds" && (
        <Cloud nodes={nodes} position={[-0.7, -0.5, 0]} />
      )}
    </group>
  );
};

export default Weather;

useGLTF.preload("/models/weatherModel.glb");
