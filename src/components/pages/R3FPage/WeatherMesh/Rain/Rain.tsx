import { Instance, Instances } from "@react-three/drei";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { rainAnimation } from "./RainAnimationLogic";

type GLTFResult = GLTF & {
  nodes: {
    rain_geo: THREE.Mesh;
  };
};

interface RainProps {
  nodes: GLTFResult["nodes"];
}

const Rain: FC<RainProps> = ({ nodes, ...props }) => {
  const rainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#60a5da",
    });
  }, []);

  // const rainRef = useRef<(THREE.Mesh | null)[]>([]);
  const rainRef = useRef<any>([]);

  const handleRainAnimation = useCallback(() => {
    if (!rainRef.current) return;
    rainAnimation(rainRef.current);
  }, []);

  useEffect(handleRainAnimation, [handleRainAnimation]);

  return (
    <Instances
      {...props}
      geometry={nodes.rain_geo.geometry}
      material={rainMaterial}
      userData={{ name: "rain_geo" }}
      limit={40}
      range={40}
      position={[1.5, 0, 0]}
      frustumCulled={false}
    >
      {Array.from({ length: 40 }).map((_, index: number) => (
        <Instance
          ref={(el) => (rainRef.current[index] = el)}
          key={index}
          name="rain_geo"
          scale={0.35}
        />
        // <mesh
        //   ref={(el) => (rainRef.current[index] = el)}
        //   key={index}
        //   name="rain_geo"
        //   geometry={nodes.rain_geo.geometry}
        //   material={rainMaterial}
        //   userData={{ name: "rain_geo" }}
        // />
      ))}
    </Instances>
  );
};

export default Rain;
