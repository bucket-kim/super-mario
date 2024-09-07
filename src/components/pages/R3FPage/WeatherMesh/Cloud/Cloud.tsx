import { Float, Instance, Instances } from "@react-three/drei";
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
    <group {...props} dispose={null} position={[-0.4, -0.5, 0]}>
      <Instances
        geometry={nodes.cloud001_geo.geometry}
        material={cloudMaterial}
        limit={10}
        range={10}
        name="cloud001_geo"
        userData={{ name: "cloud001_geo" }}
        frustumCulled={false}
      >
        {cloud001Data.map((cloud: any, index: number) => (
          <Float floatIntensity={0.1} rotationIntensity={0.2}>
            <Instance
              key={index}
              castShadow
              receiveShadow
              position={[cloud.position.x, cloud.position.y, cloud.position.z]}
              scale={cloud.scale}
            />
          </Float>
        ))}
      </Instances>
      <Instances
        name="cloud002_geo"
        geometry={nodes.cloud002_geo.geometry}
        userData={{ name: "cloud002_geo" }}
        material={cloudMaterial}
        limit={10}
        range={10}
        frustumCulled={false}
      >
        {cloud002Data.map((cloud: any, index: number) => (
          <Float floatIntensity={0.1} rotationIntensity={0.2}>
            <Instance
              key={index}
              position={[cloud.position.x, cloud.position.y, cloud.position.z]}
              castShadow
              receiveShadow
              scale={cloud.scale}
            />
          </Float>
        ))}
      </Instances>
    </group>
  );
};

export default Cloud;
