/*eslint-disable*/

import { useGLTF, useTexture } from "@react-three/drei";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

const Items = () => {
  const { nodes, materials } = useGLTF("/models/items.glb");

  const [yellowClick, setYellowClick] = useState(false);
  const [greenClick, setGreenClick] = useState(false);
  const [blueClick, setBlueClick] = useState(false);

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

  const yellowButtonRef = useRef();
  const greenButtonRef = useRef();
  const blueButtonRef = useRef();

  nodes.items_geo.geometry.attributes.uv2 =
    nodes.items_geo.geometry.attributes.uv;

  nodes.yellowButton_geo.geometry.attributes.uv2 =
    nodes.yellowButton_geo.geometry.attributes.uv;

  nodes.greenButton_geo.geometry.attributes.uv2 =
    nodes.greenButton_geo.geometry.attributes.uv;

  nodes.blueButton_geo.geometry.attributes.uv2 =
    nodes.blueButton_geo.geometry.attributes.uv;

  useFrame(() => {
    gsap.to(yellowButtonRef.current.position, {
      y: yellowClick ? 2.02703 - 0.05 : 2.02703,
    });
    gsap.to(greenButtonRef.current.position, {
      y: greenClick ? 0.988629 - 0.05 : 0.988629,
    });
    gsap.to(blueButtonRef.current.position, {
      y: blueClick ? 0.98863 - 0.05 : 0.98863,
    });
  });

  return (
    <>
      <mesh
        geometry={nodes.items_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
      />
      <mesh
        ref={yellowButtonRef}
        onPointerDown={() => {
          setYellowClick(true);
        }}
        onPointerUp={() => {
          setYellowClick(false);
        }}
        geometry={nodes.yellowButton_geo.geometry}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
        position={[-3.75874, 2.02703, 1.71684]}
      />
      <mesh
        geometry={nodes.greenButton_geo.geometry}
        ref={greenButtonRef}
        onPointerDown={() => {
          setGreenClick(true);
        }}
        onPointerUp={() => {
          setGreenClick(false);
        }}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
        position={[-4.03093, 0.988629, -0.770379]}
      />
      <mesh
        geometry={nodes.blueButton_geo.geometry}
        ref={blueButtonRef}
        onPointerDown={() => {
          setBlueClick(true);
        }}
        onPointerUp={() => {
          setBlueClick(false);
        }}
        castShadow
        receiveShadow
        material={itemMaterial[""]}
        position={[4.05705, 0.98863, -0.802817]}
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
