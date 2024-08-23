import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { degToRad } from "three/src/math/MathUtils.js";

// Define a type that extends OrbitControls but is used as MapControls
type CustomMapControls = OrbitControls & {
  _camera: {
    position: THREE.Vector3;
  };
};

const Camera = () => {
  const cameraRef = useRef<CustomMapControls | null>(null);

  const { camera } = useThree();

  const cameraLastPosition = useRef({
    x: camera.position.x,
    y: camera.position.y,
  });

  const limitPanningDistance = (e: THREE.Event) => {
    const controls = e.target as CustomMapControls;
    const target = controls._camera.position;
    const maxX = 20;
    const minX = -10;
    const maxY = 20;
    const minY = 1;
    const x = target.x;
    const y = target.y;
    console.log(target);

    if (x < minX || x > maxX) {
      target.x = x < minX ? minX : maxX;
      camera.position.x = cameraLastPosition.current.x;
    }
    if (y < minY || y > maxY) {
      target.y = y < minY ? minY : maxY;
      camera.position.y = cameraLastPosition.current.y;
    }
    cameraLastPosition.current.x = camera.position.x;
    cameraLastPosition.current.y = camera.position.y;
  };

  return (
    <>
      <CameraControls
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={cameraRef as MutableRefObject<CameraControls | null>}
        minDistance={5}
        maxDistance={15}
        onChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          limitPanningDistance(e);
        }}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(85)}
      />
      {/* <MapControls
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={cameraRef as MutableRefObject<MapControls | null>}
        minDistance={5}
        maxDistance={12.5}
        onChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          limitPanningDistance(e);
        }}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(85)}
      /> */}
    </>
  );
};

export default Camera;
