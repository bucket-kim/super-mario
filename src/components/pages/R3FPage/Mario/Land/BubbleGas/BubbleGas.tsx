import { Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const BubbleGas = () => {
  const bubbleRef = useRef<any>([]);

  const bubbleAnimation = gsap.timeline({
    paused: true,
  });

  useEffect(() => {
    if (!bubbleRef.current || bubbleRef.current.length === 0) return;
    // gsap.killTweensOf(bubbleAnimation);
    // gsap.killTweensOf(sizeAnimation);

    gsap.killTweensOf(bubbleAnimation);

    bubbleAnimation.to(
      bubbleRef.current.map((ref: any) => ref.position),
      {
        y: 0.9,
        ease: "linear",
        duration: 6,
        repeat: -1,
        stagger: {
          each: 2,
          repeat: -1,
        },
      },
      0,
    );
    bubbleRef.current.forEach((ref: any, index: number) => {
      gsap.to(ref.position, {
        x: -3.31,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: index * 0.5, // Delay for each mesh to create wave-like motion
      });
    });

    bubbleRef.current.forEach((ref: any, index: number) => {
      // Add each bubble’s size animation to the timeline
      const sizeAnimation = gsap.timeline({
        repeat: -1,
      });
      sizeAnimation
        .to(ref.scale, {
          x: 0.025,
          y: 0.025,
          z: 0.025,
          duration: 1,
          ease: "sine.inOut",
        })
        .to(ref.scale, {
          x: 0.0,
          y: 0.0,
          z: 0.0,
          duration: 1,
          delay: 4,
          ease: "sine.inOut",
        });

      sizeAnimation.delay(index * 2);
    });

    bubbleAnimation.play();
    return () => {
      bubbleAnimation.kill();
    };
  }, []);

  return (
    <group>
      <Instances limit={10} range={10}>
        <sphereGeometry />
        <meshStandardMaterial />
        {Array.from({ length: 3 }).map((_, idx) => (
          <Instance
            key={idx}
            ref={(el) => (bubbleRef.current[idx] = el)}
            position={[-3.325, 0.71, 2.685]}
            scale={[0.0, 0.0, 0.0]}
          />
        ))}
      </Instances>
    </group>
  );
};

export default BubbleGas;
