/*eslint-disable*/
import { Html, useGLTF, useTexture } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import "../button.css";
import gsap from "gsap";
import datas from "../datas";
import { useThree } from "@react-three/fiber";

const Buttons = (props) => {
  const { nodes, scene } = useGLTF("/models/buttons.glb");

  const [buttonHover, setButtonHover] = useState(false);

  const colorMap = useTexture("/images/textures/button_BaseColor.png");
  colorMap.flipY = false;
  colorMap.encoding = THREE.sRGBEncoding;

  const material = new THREE.MeshStandardMaterial({ map: colorMap });

  useMemo(() => {
    scene.traverse((child) => {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = true;
      child.toneMapped = false;
    });
  }, [scene]);

  return (
    <>

      {datas.map((data) => {
        return (
          <>
          <mesh>
            
          </mesh>
          <Html
            wrapperClass="label"
            occlude
            onOcclude={setButtonHover}
            position={data.position}
            style={{
              transition: "all 0.3s",
              opacity: buttonHover ? 1 : 0,
              transform: `scale(${buttonHover ? 1 : 0.5})`,
            }}
          >
            <h1>{data.name}</h1>
            <p>{data.information}</p>
            <img src={data.image} alt="" />
          </Html>
          </>
        );
      })}
    </>
  );
};

export default Buttons;
