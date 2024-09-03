import { FC, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { cloud001Data, cloud002Data } from "./CloudData";

type GLTFResult = GLTF & {
  nodes: {
    cloud001_geo: THREE.Mesh;
    cloud002_geo: THREE.Mesh;
  };
};

interface CloudProps {
  nodes: GLTFResult["nodes"];
}

const Cloud: FC<CloudProps> = ({ nodes, ...props }) => {
  const cloudMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#b7bfc5",
      emissive: "#b7bfc5",
      emissiveIntensity: 0.05,
    });
  }, []);

  return (
    <group {...props} dispose={null} position={[-0.7, -0.5, 0]}>
      {cloud001Data.map((cloud: any, index: number) => (
        <mesh
          key={index}
          name="cloud001_geo"
          castShadow
          receiveShadow
          position={[cloud.position.x, cloud.position.y, cloud.position.z]}
          geometry={nodes.cloud001_geo.geometry}
          material={cloudMaterial}
          scale={cloud.scale}
          userData={{ name: "cloud001_geo" }}
        />
      ))}
      {cloud002Data.map((cloud: any, index: number) => (
        <mesh
          key={index}
          name="cloud002_geo"
          castShadow
          receiveShadow
          position={[cloud.position.x, cloud.position.y, cloud.position.z]}
          geometry={nodes.cloud002_geo.geometry}
          material={cloudMaterial}
          scale={cloud.scale}
          userData={{ name: "cloud002_geo" }}
        />
      ))}
    </group>
  );
};

export default Cloud;
