const Lights = ({ ...props }) => {
  return (
    <group {...props}>
      {/* <Environment
        files={"./images/toonSky2.hdr"}
        background
        resolution={516}
      /> */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[-10, 20, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        intensity={1}
      />
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <rectAreaLight
          intensity={1}
          rotation-y={-Math.PI / 2}
          position={[-5, -1, -1]}
          scale={[50, 2, 1]}
          color={"#ffffff"}
        />
        <rectAreaLight
          intensity={3}
          rotation-y={-Math.PI / 2}
          position={[-10, -5, -1]}
          scale={[10, 2, 1]}
          // color={"#2085f6"}
        />
        <rectAreaLight
          intensity={1.5}
          rotation-y={Math.PI / 2}
          position={[10, 1, 0]}
          scale={[50, 2, 1]}
          // color={"#67aefc"}
        />
      </group>
    </group>
  );
};

export default Lights;
