import { FC } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import BubbleGas from "./BubbleGas/BubbleGas";

type GLTFResult = GLTF & {
  nodes: {
    land_geo: THREE.Mesh;
    items_geo: THREE.Mesh;
  };
};

interface LandProps {
  nodes: GLTFResult["nodes"];
  itemMaterial: THREE.MeshStandardMaterial;
  landMaterial: THREE.MeshStandardMaterial;
  [key: string]: any;
}

const Land: FC<LandProps> = ({
  nodes,
  landMaterial,
  itemMaterial,
  ...props
}) => {
  nodes.land_geo.geometry.attributes.uv2 =
    nodes.land_geo.geometry.attributes.uv;

  return (
    <group {...props}>
      <mesh
        name="land_geo"
        castShadow
        receiveShadow
        geometry={nodes.land_geo.geometry}
        position={nodes.land_geo.position}
        material={landMaterial}
        userData={{ name: "land_geo" }}
      />
      <mesh
        name="items_geo"
        castShadow
        receiveShadow
        geometry={nodes.items_geo.geometry}
        position={nodes.items_geo.position}
        material={itemMaterial}
        userData={{ name: "items_geo" }}
      />
      <BubbleGas />
    </group>
  );
};

export default Land;
