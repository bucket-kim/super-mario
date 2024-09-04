import { OrbitControls as DreiOrbitControls } from "@react-three/drei"; // Import from drei for use in JSX
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Import type from three.js
import { degToRad } from "three/src/math/MathUtils.js";

const Camera = () => {
  const { camera } = useThree();

  const maxX = 20;
  const minX = -20;
  const maxY = 15;
  const minY = 0;

  const limitPanningDistance = (e: THREE.Event) => {
    // if (!cameraRef.current) return;

    const controls = e.target as ThreeOrbitControls;

    if (!controls) return;

    const target = controls.target;

    // Clamp the target position directly
    target.x = THREE.MathUtils.clamp(target.x, minX, maxX);
    target.y = THREE.MathUtils.clamp(target.y, minY, maxY);

    // Update camera position to stay within bounds
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, minX, maxX);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, minY, maxY);
  };

  return (
    <>
      <DreiOrbitControls
        // ref={cameraRef}
        minDistance={5}
        maxDistance={12.5}
        onChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          limitPanningDistance(e);
        }}
        minPolarAngle={degToRad(-10)}
        maxPolarAngle={degToRad(85)}
      />
    </>
  );
};

export default Camera;
