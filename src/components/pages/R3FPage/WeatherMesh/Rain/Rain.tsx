import { Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { FC, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

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

  useEffect(() => {
    rainRef.current.forEach((rain: any, index: number) => {
      if (!rain) return;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8;
      rain.position.x = Math.sin(angle) * radius;
      rain.position.y = Math.random() * 2;
      rain.position.z = Math.cos(angle) * radius;

      rain.rotation.z = -0.1;

      gsap.fromTo(
        rain.position,
        {
          y: 10,
          x: Math.sin(angle) * radius,
        },
        {
          y: -1,
          x: Math.sin(angle) * radius - 2,
          delay: index * 0.1,
          repeat: -1,
          duration: 1,
          overwrite: true,
          ease: "linear",
        },
      );
    });
  }, []);

  return (
    <Instances
      {...props}
      geometry={nodes.rain_geo.geometry}
      material={rainMaterial}
      userData={{ name: "rain_geo" }}
      limit={40}
      range={40}
      position={[1.5, 0, 0]}
    >
      {Array.from({ length: 40 }).map((_, index: number) => (
        <Instance
          ref={(el) => (rainRef.current[index] = el)}
          key={index}
          name="rain_geo"
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
