import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { handleSunAnimation } from "./SunAnimationLogic";

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

  const sunRef = useRef<THREE.Group>(null);
  const beamRef = useRef<(THREE.Mesh | null)[]>([]);

  const sunAnim = useCallback(() => {
    if (!beamRef.current || !sunRef.current) return;

    const validBeams = beamRef.current.filter(
      (beam): beam is THREE.Mesh => beam !== null,
    );

    handleSunAnimation(sunRef.current, validBeams);
  }, []);

  useEffect(sunAnim, [sunAnim]);

  return (
    <group {...props}>
      <group ref={sunRef}>
        {sunBeamPosition.map((pos, index: number) => {
          return (
            <group rotation={[0, 0, degToRad(pos)]} key={index} name="sun-beam">
              <mesh
                ref={(el) => (beamRef.current[index] = el)}
                position={[0, 1.4, 0]}
                scale={0.5}
                rotation={[0, 0, 0]}
                material={sunMaterial}
              >
                <sphereGeometry args={[0.3, 8, 8]} />
              </mesh>
            </group>
          );
        })}
      </group>
      <mesh material={sunMaterial}>
        <sphereGeometry />
      </mesh>
    </group>
  );
};

export default Sun;
