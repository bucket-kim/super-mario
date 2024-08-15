import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import Lights from "../../R3F/Lights/Lights";
import MarioModel from "../../R3F/Mario/MarioModel";
import R3FPageStyleContainer from "./R3FPageStyleContainer";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const R3FPage = () => {
  return (
    <R3FPageStyleContainer>
      <Canvas
        shadows
        gl={{
          depth: true,
          alpha: true,
          stencil: true,
          antialias: true,
          toneMappingExposure: 1,
          outputColorSpace: SRGBColorSpace,
          toneMapping: ACESFilmicToneMapping,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 4, 12], fov: 35 }}
      >
        <CameraControls
          minDistance={5}
          maxDistance={24}
          minPolarAngle={degToRad(-10)}
          maxPolarAngle={degToRad(80)}
          maxAzimuthAngle={degToRad(40)}
          minAzimuthAngle={degToRad(-5)}
        />
        <Lights />
        <MarioModel position={[0, 0, 0]} />
      </Canvas>
    </R3FPageStyleContainer>
  );
};

export default R3FPage;
