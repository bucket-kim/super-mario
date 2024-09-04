import gsap from "gsap";
import * as THREE from "three";

export const handleSunAnimation = (
  sunRef: THREE.Group,
  beamRef: THREE.Mesh[],
) => {
  if (!beamRef || !sunRef) return;

  gsap.to(sunRef.rotation, {
    z: Math.PI,
    repeat: -1,
    duration: 7,
    ease: "linear",
  });

  beamRef.forEach((beam: any) =>
    gsap.to(beam.scale, {
      x: 0.7,
      y: 0.7,
      z: 0.7,
      yoyo: true,
      ease: "sine.inOut",
      repeat: -1,
    }),
  );
};
