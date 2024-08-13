import { FC } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    blueButton_geo: THREE.Mesh;
    greenButton_geo: THREE.Mesh;
    yellowButton_geo: THREE.Mesh;
  };
};

interface ColorButtonProps {
  nodes: GLTFResult["nodes"];
  buttonMaterial: THREE.MeshStandardMaterial;
  [key: string]: any;
}

const ColorButtons: FC<ColorButtonProps> = ({
  nodes,
  buttonMaterial,
  ...props
}) => {
  return (
    <group {...props}>
      <mesh
        name="blueButton_geo"
        castShadow
        receiveShadow
        geometry={nodes.blueButton_geo.geometry}
        position={nodes.blueButton_geo.position}
        material={buttonMaterial}
        userData={{ name: "blueButton_geo" }}
      />
      <mesh
        name="greenButton_geo"
        castShadow
        receiveShadow
        geometry={nodes.greenButton_geo.geometry}
        position={nodes.greenButton_geo.position}
        material={buttonMaterial}
        userData={{ name: "greenButton_geo" }}
      />
      <mesh
        name="yellowButton_geo"
        castShadow
        receiveShadow
        geometry={nodes.yellowButton_geo.geometry}
        position={nodes.yellowButton_geo.position}
        material={buttonMaterial}
        userData={{ name: "yellowButton_geo" }}
      />
    </group>
  );
};

export default ColorButtons;
