/*eslint-disable*/

import { useGLTF, useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const Buttons = () => {
  const { scene } = useGLTF("/models/buttons.glb");

  const colorMap = useTexture("/images/textures/button_BaseColor.png");
  colorMap.flipY = false;

  useMemo(
    () =>
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          obj.material.map = colorMap;
        }
      }),
    [scene]
  );

  return <primitive object={scene} dispose={null} />;
};

export default Buttons;
