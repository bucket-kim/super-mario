import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

const Land = () => {
  const { nodes } = useGLTF("/models/land.glb");

  const colorMap = useTexture("/images/textures/land/land_BaseColor.png");
  const roughnessMap = useTexture("/images/textures/land/land_Roughness.png");
  const normalMap = useTexture("/images/textures/land/land_Normal.png");
  const aoMap = useTexture("/images/textures/land/land_AO.png");

  colorMap.flipY = false;
  roughnessMap.flipY = false;
  normalMap.flipY = false;
  aoMap.flipY = false;

  colorMap.encoding = THREE.sRGBEncoding;

  nodes.land_geo.geometry.attributes.uv2 =
    nodes.land_geo.geometry.attributes.uv;

  return (
    <>
      <mesh geometry={nodes.land_geo.geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={colorMap}
          clearcoatRoughnessMap={roughnessMap}
          clearcoatNormalMap={normalMap}
          aoMap={aoMap}
          aoMapIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Land;
