import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import Camera from "./Camera/Camera";
import Lights from "./Lights/Lights";
import MarioModel from "./Mario/MarioModel";
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
          antialias: true,
          toneMappingExposure: 1,
          outputColorSpace: SRGBColorSpace,
          toneMapping: ACESFilmicToneMapping,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 4, 12], fov: 35 }}
      >
        <fog attach="fog" args={["#c9e5f6", 10, 80]} />
        <color attach={"background"} args={["#58c5fe"]} />
        <Camera />
        <Lights />
        <MarioModel position={[0, 0, 0]} />
      </Canvas>
    </R3FPageStyleContainer>
  );
};

export default R3FPage;
