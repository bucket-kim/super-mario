import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Components/Scene";

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [5, 5, 10], fov: 35, near: 0.1, far: 1000 }}
      >
        <OrbitControls />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
