import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const Cloud = () => {
  const { scene } = useGLTF("./models/clouds.glb");

  const { clock } = useThree();

  const material = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "white",
    });

    return material;
  }, []);

  const getRandNumb = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min + 1) + min;
  };

  const random = (getRandNumb(1, 3.5) / 10).toFixed(2);

  useMemo(
    () =>
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.name.includes("001")) {
            child.position.x = Math.sin(clock.elapsedTime) * random;
          }
        }
      }),
    [scene]
  );

  useFrame((state) => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.includes("001")) {
          child.position.x =
            Math.sin(state.clock.elapsedTime) * random - 2.998856544494629;
        }
        if (child.name.includes("002")) {
          child.position.x = Math.cos(state.clock.elapsedTime) * 0.15 - 3;
        }
        if (child.name.includes("003")) {
          child.position.x =
            Math.sin(state.clock.elapsedTime) * random - 3.2886857986450195;
        }
        if (child.name.includes("004")) {
          child.position.x =
            Math.cos(state.clock.elapsedTime) * random - 3.116790294647217;
        }
        if (child.name.includes("005")) {
          child.position.x =
            Math.cos(state.clock.elapsedTime) * random - 3.340785503387451;
        }
        if (child.name.includes("006")) {
          child.position.x =
            Math.sin(state.clock.elapsedTime) * random - 3.724377393722534;
          // console.log(child.position.x);
        }
        if (child.name.includes("007")) {
          child.position.x =
            Math.cos(state.clock.elapsedTime) * random - 3.9110183715820312;
          // console.log(child.position.x);
        }
        if (child.name.includes("008")) {
          child.position.x =
            Math.sin(state.clock.elapsedTime) * random - 4.181217193603516;
          // console.log(child.position.x);
        }
        if (child.name.includes("009")) {
          child.position.x =
            Math.cos(state.clock.elapsedTime) * random - 4.342790126800537;
        }
      }
    });
  });

  return (
    <>
      <primitive object={scene} />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
    </>
  );
};

export default Cloud;
