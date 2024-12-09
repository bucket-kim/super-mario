import { Instance, Instances } from "@react-three/drei";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { snowAnimation } from "./SnowAnimationLogic";

type GLTFResult = GLTF & {
  nodes: {
    snow_geo: THREE.Mesh;
  };
};

interface SnowProps {
  nodes: GLTFResult["nodes"];
}

const Snow: FC<SnowProps> = ({ nodes, ...props }) => {
  const snowRef = useRef<any>([]);

  const snowMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#e8f2f9",
      emissive: "#e8f2f9",
      emissiveIntensity: 0.3,
      toneMapped: false,
    });
  }, []);

  const handleSnowAnimation = useCallback(() => {
    if (!snowRef.current) return;
    snowAnimation(snowRef.current);
  }, []);

  useEffect(handleSnowAnimation, [handleSnowAnimation]);

  return (
    <Instances
      {...props}
      geometry={nodes.snow_geo.geometry}
      material={snowMaterial}
      userData={{ name: "snow_geo" }}
      limit={200}
      range={200}
      position={[1.5, 0, 0]}
      frustumCulled={false}
    >
      {Array.from({ length: 160 }).map((_, index: number) => (
        <Instance
          key={index}
          ref={(el) => (snowRef.current[index] = el)}
          name="snow_geo"
          scale={Math.random() * 0.2 + 0.05}
        />
      ))}
    </Instances>
  );
};

export default Snow;
