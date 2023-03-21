import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Components/Scene";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import Controls from "./Controls";

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [5, 5, 10], fov: 35, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <Controls />
        <OrbitControls
          maxPolarAngle={Math.PI * 0.5}
          maxDistance={12}
          minDistance={3}
        />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
