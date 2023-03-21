import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

const Controls = () => {
  const { camera } = useThree();

  const minPan = new THREE.Vector3(-4, 0, -4);
  const maxPan = new THREE.Vector3(4, 2, 4);
  const _v = new THREE.Vector3();

  return (
    <>
      <OrbitControls
        maxPolarAngle={Math.PI * 0.45}
        maxDistance={12}
        minDistance={3}
        onChange={(e) => {
          _v.copy(e.target.target);
          e.target.target.clamp(minPan, maxPan);
          _v.sub(e.target.target);
          camera.position.sub(_v);
          console.log(_v);
        }}
      />
    </>
  );
};

export default Controls;
