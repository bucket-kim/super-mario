import { FC } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    eyeball_geo: THREE.Mesh;
  };
};

interface EyeballProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const emissionColor = "#f1953e";

const Eyeball: FC<EyeballProps> = ({ nodes, ...props }) => {
  return (
    <group {...props}>
      <group
        position={[
          nodes.eyeball_geo.position.x - 0.38,
          nodes.eyeball_geo.position.y + 0.52,
          nodes.eyeball_geo.position.z + 1.4,
        ]}
      >
        <pointLight
          intensity={0.2}
          position={[0, 0.05, nodes.eyeball_geo.position.z + 0.05]}
          color={emissionColor}
        />
        <mesh
          name="eyeball_geo"
          castShadow
          receiveShadow
          userData={{ name: "land_geo" }}
          scale={0.045}
          // geometry={nodes.eyeball_geo.geometry}
        >
          <sphereGeometry />
          <meshStandardMaterial
            emissive={emissionColor}
            color={emissionColor}
          />
        </mesh>
      </group>
      <group
        position={[
          nodes.eyeball_geo.position.x - 0.65,
          nodes.eyeball_geo.position.y + 0.52,
          nodes.eyeball_geo.position.z + 1.4,
        ]}
      >
        <pointLight
          intensity={0.2}
          position={[0, 0.05, nodes.eyeball_geo.position.z + 0.05]}
          color={emissionColor}
        />
        <mesh
          name="eyeball_geo"
          castShadow
          receiveShadow
          userData={{ name: "land_geo" }}
          scale={0.045}
          // geometry={nodes.eyeball_geo.geometry}
        >
          <sphereGeometry />
          <meshStandardMaterial
            emissive={emissionColor}
            color={emissionColor}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Eyeball;
