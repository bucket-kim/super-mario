import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Components/Scene";
import * as THREE from "three";
import Controls from "./Controls";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef();

  return (
    <>
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [5, 5, 10], fov: 35, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <Controls />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
