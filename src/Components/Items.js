/*eslint-disable*/

import { useGLTF, useTexture } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

const Items = () => {
  const { nodes, materials } = useGLTF("/models/items.glb");

  const colorMap = useTexture("/images/textures/items/items_BaseColor.png");
  const roughnessMap = useTexture("/images/textures/items/items_Roughness.png");
  const normalMap = useTexture("/images/textures/items/items_Normal.png");
  const aoMap = useTexture("/images/textures/items/items_AO.png");

  colorMap.flipY = false;
  roughnessMap.flipY = false;
  normalMap.flipY = false;
  aoMap.flipY = false;

  colorMap.encoding = THREE.sRGBEncoding;

  nodes.items_geo.geometry.attributes.uv2 =
    nodes.items_geo.geometry.attributes.uv;

  const itemMaterial = useMemo(() => {
    materials[""] = new THREE.MeshPhysicalMaterial({
      map: colorMap,
      clearcoatRoughnessMap: roughnessMap,
      clearcoatNormalMap: normalMap,
      side: THREE.DoubleSide,
      aoMap: aoMap,
      aoMapIntensity: 0.5,
    });
    return materials;
  }, []);

  nodes.items_geo.geometry.attributes.uv2 =
    nodes.items_geo.geometry.attributes.uv;

  nodes.yellowButton_geo.geometry.attributes.uv2 =
    nodes.yellowButton_geo.geometry.attributes.uv;

  nodes.greenButton_geo.geometry.attributes.uv2 =
    nodes.greenButton_geo.geometry.attributes.uv;

  nodes.blueButton_geo.geometry.attributes.uv2 =
    nodes.blueButton_geo.geometry.attributes.uv;

  return (
    <>
      <mesh
        geometry={nodes.items_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
      />
      <mesh
        geometry={nodes.yellowButton_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
        position={[-4.031905651092529, 1.0030899047851562, -0.6587948203086853]}
      />
      <mesh
        geometry={nodes.greenButton_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
      />
      <mesh
        geometry={nodes.blueButton_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
      />
      <mesh
        geometry={nodes.eyeball_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
      />
      {/* <mesh
        geometry={nodes.eyeball_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
      /> */}
    </>
  );
};

export default Items;
