import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../State/useGlobalState";

const Lights = ({ ...props }) => {
  const { isSunset } = useGlobalState((state) => {
    return {
      isSunset: state.isSunset,
    };
  }, shallow);

  return (
    <group {...props}>
      {/* <Environment
        files={"./images/toonSky2.hdr"}
        background
        resolution={516}
      /> */}
      <ambientLight intensity={isSunset ? 0.3 : 1} />
      <directionalLight
        position={[-10, 20, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        intensity={isSunset ? 0.5 : 1}
      />
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <rectAreaLight
          intensity={isSunset ? 0.5 : 1}
          rotation-y={-Math.PI / 2}
          position={[-7, -1, -1]}
          scale={[50, 4, 1]}
          color={isSunset ? "#2085f6" : "#ffffff"}
        />
        <rectAreaLight
          intensity={isSunset ? 1 : 3}
          rotation-y={-Math.PI / 2}
          position={[-10, -5, -1]}
          scale={[10, 4, 1]}
          color={isSunset ? "#2085f6" : "#ffffff"}
        />
        <rectAreaLight
          intensity={isSunset ? 0.4 : 1.5}
          rotation-y={Math.PI / 2}
          position={[10, 1, 0]}
          scale={[50, 4, 1]}
          color={isSunset ? "#67aefc" : "#ffffff"}
        />
      </group>
    </group>
  );
};

export default Lights;
