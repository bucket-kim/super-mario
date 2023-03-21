import { Environment, Lightformer, useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import Models from "./Models";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const Scene = () => {
  const texture = useTexture("./images/toonSky.png");
  texture.encoding = THREE.sRGBEncoding;
  const { camera } = useThree();

  return (
    <>
      <Environment
        // path={"/images/toonSky/"}
        // files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        files={"./images/toonSky2.hdr"}
        encoding={THREE.sRGBEncoding}
        background
        near={1}
        far={1000}
        resolution={516}
        position={[0, -10, 0]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-10, 20, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        intensity={0.75}
      />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 5, -10]}
            scale={[10, 10, 1]}
            // color={0x91daff}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 2]}
              scale={[4, 1, 1]}
              color={0x91daff}
            />
          ))}
          <Lightformer
            intensity={1}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[50, 2, 1]}
            color={0x0093dd}
          />
          <Lightformer
            intensity={4}
            rotation-y={Math.PI / 2}
            position={[-5, -5, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      <mesh position={[0, -20, 0]} rotation={[0, -Math.PI * 1.4, 0]}>
        <sphereGeometry args={[200, 200, 64, 64]} />
        <meshBasicMaterial side={THREE.BackSide} map={texture} />
      </mesh>
      <Models position={[0, 0, 0]} />
    </>
  );
};

export default Scene;
