import { Environment, Lightformer } from "@react-three/drei";

const Lights = ({ ...props }) => {
  return (
    <group {...props}>
      <Environment
        files={"./images/toonSky2.hdr"}
        background
        near={1}
        far={1000}
        resolution={516}
      />
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[-10, 20, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        // shadow-bias={-0.00001}
        intensity={1}
      />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer
            intensity={4}
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
            intensity={10}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[50, 2, 1]}
            color={0xcce8ff}
          />
          <Lightformer
            intensity={4}
            rotation-y={Math.PI / 2}
            position={[-5, -5, -1]}
            scale={[50, 2, 1]}
            // color={0x2085f6}
          />
          <Lightformer
            intensity={4}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
            color={0x67aefc}
          />
        </group>
      </Environment>
    </group>
  );
};

export default Lights;