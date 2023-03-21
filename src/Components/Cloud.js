import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useMemo } from "react";
import * as THREE from "three";

const Cloud = () => {
  const { scene } = useGLTF("./models/clouds.glb");

  const { clock } = useThree();

  console.log(clock);

  const material = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "white",
    });

    return material;
  }, []);

  useMemo(
    () =>
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }),
    [scene]
  );

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
