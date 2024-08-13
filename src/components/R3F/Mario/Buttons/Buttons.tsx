import { useTexture } from "@react-three/drei";
import { FC, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    button_01: THREE.Mesh;
    button_02: THREE.Mesh;
    button_03: THREE.Mesh;
    button_04: THREE.Mesh;
    button_05: THREE.Mesh;
    button_06: THREE.Mesh;
    button_07: THREE.Mesh;
    button_08: THREE.Mesh;
    button_09: THREE.Mesh;
    button_10: THREE.Mesh;
    button_11: THREE.Mesh;
    button_12: THREE.Mesh;
    button_13: THREE.Mesh;
    button_14: THREE.Mesh;
    button_15: THREE.Mesh;
    button_16: THREE.Mesh;
    button_17: THREE.Mesh;
    button_18: THREE.Mesh;
    button_19: THREE.Mesh;
    button_20: THREE.Mesh;
    button_21: THREE.Mesh;
    button_22: THREE.Mesh;
    button_23: THREE.Mesh;
    button_24: THREE.Mesh;
    button_25: THREE.Mesh;
  };
};

interface ButtonsProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const Buttons: FC<ButtonsProps> = ({ nodes, ...props }) => {
  const colorMap = useTexture("/images/textures/button_BaseColor.png");
  colorMap.flipY = false;

  const buttonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: colorMap,
    });
  }, [colorMap]);

  return (
    <group {...props} dispose={null}>
      <mesh
        name="button_01"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_01.geometry}
        position={nodes.button_01.position}
        userData={{ name: "button_01" }}
      />
      <mesh
        name="button_02"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_02.geometry}
        position={nodes.button_02.position}
        userData={{ name: "button_02" }}
      />
      <mesh
        name="button_03"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_03.geometry}
        position={nodes.button_03.position}
        userData={{ name: "button_03" }}
      />
      <mesh
        name="button_04"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_04.geometry}
        position={nodes.button_04.position}
        userData={{ name: "button_04" }}
      />
      <mesh
        name="button_05"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_05.geometry}
        position={nodes.button_05.position}
        userData={{ name: "button_05" }}
      />
      <mesh
        name="button_06"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_06.geometry}
        position={nodes.button_06.position}
        userData={{ name: "button_06" }}
      />
      <mesh
        name="button_07"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_07.geometry}
        position={nodes.button_07.position}
        userData={{ name: "button_07" }}
      />
      <mesh
        name="button_08"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_08.geometry}
        position={nodes.button_08.position}
        userData={{ name: "button_08" }}
      />
      <mesh
        name="button_09"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_09.geometry}
        position={nodes.button_09.position}
        userData={{ name: "button_09" }}
      />
      <mesh
        name="button_10"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_10.geometry}
        position={nodes.button_10.position}
        userData={{ name: "button_10" }}
      />
      <mesh
        name="button_11"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_11.geometry}
        position={nodes.button_11.position}
        userData={{ name: "button_11" }}
      />
      <mesh
        name="button_12"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_12.geometry}
        position={nodes.button_12.position}
        userData={{ name: "button_12" }}
      />
      <mesh
        name="button_13"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_13.geometry}
        position={nodes.button_13.position}
        userData={{ name: "button_13" }}
      />
      <mesh
        name="button_14"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_14.geometry}
        position={nodes.button_14.position}
        userData={{ name: "button_14" }}
      />
      <mesh
        name="button_15"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_15.geometry}
        position={nodes.button_15.position}
        userData={{ name: "button_15" }}
      />
      <mesh
        name="button_16"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_16.geometry}
        position={nodes.button_16.position}
        userData={{ name: "button_16" }}
      />
      <mesh
        name="button_17"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_17.geometry}
        position={nodes.button_17.position}
        userData={{ name: "button_17" }}
      />
      <mesh
        name="button_18"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_18.geometry}
        position={nodes.button_18.position}
        userData={{ name: "button_18" }}
      />
      <mesh
        name="button_19"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_19.geometry}
        position={nodes.button_19.position}
        userData={{ name: "button_19" }}
      />
      <mesh
        name="button_20"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_20.geometry}
        position={nodes.button_20.position}
        userData={{ name: "button_20" }}
      />
      <mesh
        name="button_21"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_21.geometry}
        position={nodes.button_21.position}
        userData={{ name: "button_21" }}
      />
      <mesh
        name="button_22"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_22.geometry}
        position={nodes.button_22.position}
        userData={{ name: "button_22" }}
      />
      <mesh
        name="button_23"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_23.geometry}
        position={nodes.button_23.position}
        userData={{ name: "button_23" }}
      />
      <mesh
        name="button_24"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_24.geometry}
        position={nodes.button_24.position}
        userData={{ name: "button_24" }}
      />
      <mesh
        name="button_25"
        castShadow
        receiveShadow
        material={buttonMaterial}
        geometry={nodes.button_25.geometry}
        position={nodes.button_25.position}
        userData={{ name: "button_25" }}
      />
    </group>
  );
};

export default Buttons;
