import { useMemo } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const Sun = ({ ...props }) => {
  const sunBeamPosition = [45, 90, 135, 180, -135, -90, -45, 0];

  const sunMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ffbc12",
      toneMapped: false,
      emissive: "#ffbc12",
      emissiveIntensity: 0.6,
    });
  }, []);

  return (
    <group {...props}>
      {sunBeamPosition.map((pos, index: number) => {
        return (
          <group rotation={[0, 0, degToRad(pos)]} key={index} name="sun-beam">
            <mesh
              position={[0, 1.5, 0]}
              scale={0.3}
              rotation={[0, 0, 0]}
              material={sunMaterial}
            >
              <sphereGeometry args={[0.3, 8, 8]} />
            </mesh>
            <mesh
              position={[0, 1.35, 0]}
              scale={0.3}
              rotation={[0, 0, 0]}
              material={sunMaterial}
            >
              <cylinderGeometry args={[0.3, 0.3, 1]} />
            </mesh>
            <mesh
              position={[0, 1.2, 0]}
              scale={0.3}
              rotation={[0, 0, 0]}
              material={sunMaterial}
            >
              <sphereGeometry args={[0.3, 8, 8]} />
            </mesh>
          </group>
        );
      })}
      <mesh material={sunMaterial}>
        <sphereGeometry />
      </mesh>
    </group>
  );
};

export default Sun;
