import gsap from "gsap";
import * as THREE from "three";

export const rainAnimation = (rainRef: THREE.Mesh[]) => {
  rainRef.forEach((rain: THREE.Mesh, index: number) => {
    if (!rain) return;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 8;
    rain.position.x = Math.sin(angle) * radius;
    rain.position.y = Math.random() * 2;
    rain.position.z = Math.cos(angle) * radius;

    rain.rotation.z = -0.5;

    gsap.fromTo(
      rain.position,
      {
        y: 8,
        x: Math.sin(angle) * radius,
      },
      {
        y: -1,
        x: Math.sin(angle) * radius - 3,
        delay: index * 0.1,
        repeat: -1,
        duration: 1.5,
        overwrite: true,
        ease: "linear",
      },
    );
  });
};
