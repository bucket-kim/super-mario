import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
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
          autoClear: false,
          autoClearDepth: false,
          toneMappingExposure: 1,
          outputColorSpace: SRGBColorSpace,
          toneMapping: ACESFilmicToneMapping,
          powerPreference: "high-performance",
        }}
      >
        <OrbitControls />
        <Lights />
        <MarioModel position={[0, -1, 0]} />
      </Canvas>
    </R3FPageStyleContainer>
  );
};

export default R3FPage;
