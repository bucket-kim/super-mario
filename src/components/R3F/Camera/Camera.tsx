import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

const Camera = () => {
  const cameraRef = useRef(null);

  const {
    camera,
    gl: { domElement },
  } = useThree();

  useEffect(() => {
    console.log(camera.position.x);
  }, [camera]);

  return (
    <>
      <CameraControls
        ref={cameraRef}
        args={[camera, domElement]}
        minDistance={5}
        maxDistance={12.5}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(80)}
      />
      {/* <MapControls ref={cameraRef}/> */}
    </>
  );
};

export default Camera;
