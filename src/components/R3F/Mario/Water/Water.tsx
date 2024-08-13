import { FC, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ocean_geo: THREE.Mesh;
    water_geo: THREE.Mesh;
  };
};

interface WaterProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const Water: FC<WaterProps> = ({ nodes, ...props }) => {
  const waterMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#0088ff",
    });
  }, []);

  return (
    <group {...props}>
      <mesh
        name="ocean_geo"
        castShadow
        receiveShadow
        material={waterMaterial}
        geometry={nodes.ocean_geo.geometry}
        position={nodes.ocean_geo.position}
        userData={{ name: "ocean_geo" }}
      />
      <mesh
        name="water_geo"
        castShadow
        receiveShadow
        material={waterMaterial}
        geometry={nodes.water_geo.geometry}
        position={nodes.water_geo.position}
        userData={{ name: "water_geo" }}
      />
    </group>
  );
};

export default Water;
