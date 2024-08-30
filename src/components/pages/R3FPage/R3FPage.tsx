import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../State/useGlobalState";
import Camera from "./Camera/Camera";
import { Controls } from "./Controls/Controls";
import Lights from "./Lights/Lights";
import MarioModel from "./Mario/MarioModel";
import R3FPageStyleContainer from "./R3FPageStyleContainer";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const R3FPage = () => {
  const { isSunset } = useGlobalState((state) => {
    return {
      isSunset: state.isSunset,
    };
  }, shallow);

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    [],
  );

  return (
    <R3FPageStyleContainer>
      <Canvas
        shadows
        gl={{ antialias: false }}
        camera={{ position: [0, 4, 12], fov: 35 }}
        dpr={[1, 2]}
      >
        {/* <fog attach="fog" args={["#c9e5f6", 10, 80]} /> */}
        <color attach="background" args={[isSunset ? "#08223f" : "#88d2fa"]} />

        <KeyboardControls map={map}>
          <Camera />
          <Lights />
          <MarioModel position={[0, 0, 0]} />
        </KeyboardControls>
      </Canvas>
    </R3FPageStyleContainer>
  );
};

export default R3FPage;
