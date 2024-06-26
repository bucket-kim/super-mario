import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import R3FPageStyleContainer from "./R3FPageStyleContainer";

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
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </R3FPageStyleContainer>
  );
};

export default R3FPage;
