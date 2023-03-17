import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Components/Scene";
import * as THREE from "three";

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
        <OrbitControls />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
