/*eslint-disable*/

import { Html, useGLTF, useTexture } from "@react-three/drei";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import datas from "../datas.js";

console.log(datas);

const Buttons = () => {
  const { scene } = useGLTF("/models/buttons.glb");

  const [onHover, setOnHover] = useState(false);

  const colorMap = useTexture("/images/textures/button_BaseColor.png");
  colorMap.flipY = false;

  useMemo(
    () =>
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          obj.material.map = colorMap;
          console.log(obj.position);
        }
      }),
    [scene]
  );

  return (
    <>
      <primitive object={scene} dispose={null} />
      <Html></Html>
    </>
  );
};

export default Buttons;
