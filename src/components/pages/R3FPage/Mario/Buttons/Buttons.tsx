import { useTexture } from "@react-three/drei";
import { FC, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../../State/useGlobalState";

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

interface ButtonProps {
  buttonName: keyof GLTFResult["nodes"];
  nodes: GLTFResult["nodes"];
  buttonMaterial: THREE.MeshStandardMaterial;
}

const Button: FC<ButtonProps> = ({ buttonName, nodes, buttonMaterial }) => {
  const buttonMesh = nodes[buttonName] as THREE.Mesh;
  const { setButtonIndex } = useGlobalState((state) => {
    return {
      setButtonIndex: state.setButtonIndex,
    };
  }, shallow);
  return (
    <mesh
      name={buttonName}
      // onPointerEnter={() => setButtonIndex(buttonName)}
      onClick={() => setButtonIndex(buttonName)}
      // onPointerOut={() => setButtonIndex("")}
      castShadow
      receiveShadow
      material={buttonMaterial}
      geometry={buttonMesh.geometry}
      position={buttonMesh.position}
      userData={{ name: buttonName }}
    />
  );
};

const Buttons: FC<ButtonsProps> = ({ nodes, ...props }) => {
  const colorMap = useTexture("/images/textures/button_BaseColor.png");
  colorMap.flipY = false;

  const buttonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: colorMap,
    });
  }, [colorMap]);

  const buttonNames = Object.keys(nodes) as (keyof GLTFResult["nodes"])[];

  return (
    <group {...props} dispose={null}>
      {buttonNames.map((buttonName: any, index) => {
        if (buttonName.includes("button_")) {
          return (
            <Button
              key={index}
              buttonName={buttonName}
              nodes={nodes}
              buttonMaterial={buttonMaterial}
            />
          );
        }
      })}
    </group>
  );
};

export default Buttons;
