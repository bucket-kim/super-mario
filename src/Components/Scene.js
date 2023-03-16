import { Environment, Lightformer } from "@react-three/drei";
import React from "react";
import Models from "./Models";

const Scene = () => {
  return (
    <>
      <Environment files={"/images/sky2.hdr"} background />
      {/* <Environment files={"./images/sky4.hdr"} background /> */}
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
      <Models />
    </>
  );
};

export default Scene;
