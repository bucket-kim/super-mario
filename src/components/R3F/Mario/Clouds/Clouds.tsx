import { useFrame } from "@react-three/fiber";
import { FC, forwardRef, useMemo, useRef } from "react";
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

interface CouldsProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}
interface CouldProps {
  cloudName: keyof GLTFResult["nodes"];
  nodes: GLTFResult["nodes"];
  cloudMaterial: THREE.MeshStandardMaterial;
  ref: any;
}

export type CloudRef = THREE.Mesh;

const Cloud = forwardRef<CloudRef, CouldProps>(
  ({ cloudName, nodes, cloudMaterial }, ref) => {
    const cloudMesh = nodes[cloudName] as THREE.Mesh;

    return (
      <mesh
        ref={ref}
        name={cloudName}
        castShadow
        receiveShadow
        material={cloudMaterial}
        geometry={cloudMesh.geometry}
        position={cloudMesh.position}
        userData={{ name: { cloudName } }}
      />
    );
  },
);

const Clouds: FC<CouldsProps> = ({ nodes, ...props }) => {
  const cloudMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffffff",
    });
  }, []);

  const cloudsNames = Object.keys(nodes) as (keyof GLTFResult["nodes"])[];

  const cloudRef = useRef<THREE.Mesh[]>([]);

  const getRandNumb = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min + 1) + min;
  };

  const randNum = getRandNumb(1, 3.5);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (!cloudRef.current) return;
    cloudRef.current.map((cloud, index) => {
      cloud.position.x +=
        Math.sin(elapsedTime * 1.25 + index) * randNum * 0.0005;
    });
  });

  return (
    <group {...props} dispose={null}>
      {cloudsNames.map((cloudName: any, index) => {
        if (cloudName.includes("cloud")) {
          return (
            <Cloud
              ref={(el: THREE.Mesh) => (cloudRef.current[index] = el)}
              key={index}
              cloudName={cloudName}
              nodes={nodes}
              cloudMaterial={cloudMaterial}
            />
          );
        }
      })}
    </group>
  );
};

export default Clouds;
