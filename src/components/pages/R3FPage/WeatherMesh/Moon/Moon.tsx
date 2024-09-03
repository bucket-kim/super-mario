import { FC, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    moon_geo: THREE.Mesh;
  };
};

interface MoonProps {
  nodes: GLTFResult["nodes"];
}

const Moon: FC<MoonProps> = ({ nodes, ...props }) => {
  const moonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#cbd7e0",
      emissive: "#cbd7e0",
      toneMapped: false,
      emissiveIntensity: 0.8,
    });
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        name="moon_geo"
        castShadow
        receiveShadow
        position={[2.5, 3.5, -3]}
        geometry={nodes.moon_geo.geometry}
        material={moonMaterial}
        scale={0.25}
        userData={{ name: "moon_geo" }}
      />
    </group>
  );
};

export default Moon;
