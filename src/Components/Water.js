/*eslint-disable*/

import { useGLTF, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/water/vertex";
import fragmentShader from "./shaders/water/fragment";

const Water = () => {
  const { nodes } = useGLTF("/models/water.glb");

  return (
    <group>
      <mesh
        geometry={nodes.water_geo.geometry}
        // material={waterMaterial}
        receiveShadow
        castShadow
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
        // material={waterMaterial}
      >
        <planeGeometry args={[40, 40]} />
      </mesh>
    </group>
  );
};

export default Water;
