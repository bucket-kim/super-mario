import { FC, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    cloud001: THREE.Mesh;
    cloud002: THREE.Mesh;
    cloud003: THREE.Mesh;
    cloud004: THREE.Mesh;
    cloud005: THREE.Mesh;
    cloud006: THREE.Mesh;
    cloud007: THREE.Mesh;
    cloud008: THREE.Mesh;
    cloud009: THREE.Mesh;
  };
};

interface CouldProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const Clouds: FC<CouldProps> = ({ nodes, ...props }) => {
  const cloudMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffffff",
    });
  }, []);

  return (
    <group {...props}>
      <mesh
        name="cloud001"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud001.geometry}
        position={nodes.cloud001.position}
        userData={{ name: "cloud001" }}
      />
      <mesh
        name="cloud002"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud002.geometry}
        position={nodes.cloud002.position}
        userData={{ name: "cloud002" }}
      />
      <mesh
        name="cloud003"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud003.geometry}
        position={nodes.cloud003.position}
        userData={{ name: "cloud003" }}
      />
      <mesh
        name="cloud004"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud004.geometry}
        position={nodes.cloud004.position}
        userData={{ name: "cloud004" }}
      />
      <mesh
        name="cloud005"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud005.geometry}
        position={nodes.cloud005.position}
        userData={{ name: "cloud005" }}
      />
      <mesh
        name="cloud006"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud006.geometry}
        position={nodes.cloud006.position}
        userData={{ name: "cloud006" }}
      />
      <mesh
        name="cloud007"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud007.geometry}
        position={nodes.cloud007.position}
        userData={{ name: "cloud007" }}
      />
      <mesh
        name="cloud008"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud008.geometry}
        position={nodes.cloud008.position}
        userData={{ name: "cloud008" }}
      />
      <mesh
        name="cloud009"
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={nodes.cloud009.geometry}
        position={nodes.cloud009.position}
        userData={{ name: "cloud009" }}
      />
    </group>
  );
};

export default Clouds;
