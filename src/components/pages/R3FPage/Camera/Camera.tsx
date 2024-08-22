import { MapControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const Camera = () => {
  const cameraRef = useRef(null);

  const { camera, size } = useThree();

  const cameraLastPosition = useRef({
    x: camera.position.x,
    y: camera.position.y,
  });

  const limitPanningDistance = useCallback(
    (e?: THREE.Event) => {
      if (!e.target) return;

      const maxX = 4;
      const minX = -4;
      const maxY = 10;
      const minY = 0;
      const x = e.target.target.x;
      const y = e.target.target.y;

      if (x < minX || x > maxX) {
        e.target.target.setX(x < minX ? minX : maxX);
        camera.position.setX(cameraLastPosition.current.x);
      }
      if (y < minY || y > maxY) {
        e.target.target.setY(y < minY ? minY : maxY);
        camera.position.setY(cameraLastPosition.current.y);
      }
      cameraLastPosition.current.x = camera.position.x;
      cameraLastPosition.current.y = camera.position.y;
    },
    [camera.zoom, size],
  );

  return (
    <>
      {/* <CameraControls
        makeDefault
        ref={cameraRef}
        minDistance={5}
        maxDistance={12.5}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(85)}
      /> */}
      <MapControls
        ref={cameraRef}
        minDistance={5}
        maxDistance={12.5}
        onChange={(e) => {
          limitPanningDistance(e);
        }}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(85)}
      />
      {/* <OrbitControls
        ref={cameraRef}
        enablePan={false}
        zoomSpeed={0.4}
        enableDamping
        minDistance={5}
        maxDistance={12.5}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(80)}
      /> */}
    </>
  );
};

export default Camera;
