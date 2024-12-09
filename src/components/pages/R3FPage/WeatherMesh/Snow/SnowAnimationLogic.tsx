import gsap from "gsap";
import * as THREE from "three";

export const snowAnimation = (snowRef: THREE.Mesh[]) => {
  snowRef.forEach((snow: THREE.Mesh, index: number) => {
    if (!snow) return;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 8;
    snow.position.x = Math.sin(angle) * radius;
    snow.position.y = Math.random() * 2;
    snow.position.z = Math.cos(angle) * radius;
    const initialX = Math.sin(angle) * radius;
    const initialZ = Math.cos(angle) * radius;

    gsap.fromTo(
      snow.position,
      {
        y: 7,
        x: Math.sin(angle) * radius,
      },
      {
        y: -1,
        delay: index * 0.2,
        repeat: -1,
        duration: 8,
        overwrite: true,
        ease: "linear",
        onUpdate: function () {
          // Calculate progress (0 to 1)
          const progress = this.progress();

          // Create swaying effect using different frequencies for x and z
          const swayAmplitude = 0.5; // Adjust this for wider/narrower sway
          const xOffset = Math.sin(progress * Math.PI * 2) * swayAmplitude;
          const zOffset = Math.cos(progress * Math.PI * 1.5) * swayAmplitude;

          snow.position.x = initialX + xOffset;
          snow.position.z = initialZ + zOffset;
        },
      },
    );
    gsap.to(snow.rotation, {
      y: Math.PI,
      repeat: -1,
      duration: Math.random() * 4,
      delay: index * 0.2,
      ease: "linear",
    });
  });
};
