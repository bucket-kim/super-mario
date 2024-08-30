import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const CharSprite = () => {
  const spriteRef = useRef<THREE.Sprite | null>(null);

  const [currentTile, setCurrentTile] = useState(4);

  const map = useTexture("images/mario.png");
  const spriteMap = useMemo(() => {
    map.colorSpace = "srgb";
    map.magFilter = THREE.NearestFilter;
    return map;
  }, []);

  const tileHoriz = 10;
  const tileVert = 21;
  spriteMap.repeat.set(1 / tileHoriz, 1 / tileVert);

  const offsetX = (currentTile % tileHoriz) / tileHoriz;
  const offsetY =
    (tileVert - Math.floor(currentTile / tileHoriz) - 1) / tileVert;

  spriteMap.offset.set(offsetX, offsetY);

  const AnimateSprite = useCallback(
    (
      currentInd: number,
      nextInd: number,
      duration: number,
      onComplete: () => void,
    ) => {
      const toggleTile = () => {
        setCurrentTile((prev) => (prev === currentInd ? nextInd : currentInd));
      };
      const intervalId = setInterval(toggleTile, 150);

      setTimeout(() => {
        clearInterval(intervalId);
        setCurrentTile(currentInd);
        onComplete();
      }, duration);
    },
    [],
  );

  const startAnimationSequence = useCallback(() => {
    setCurrentTile(4);

    setTimeout(() => {
      if (!spriteRef.current) return;
      gsap.to(spriteRef.current.position, {
        x: -3.6,
        duration: 2.8,
        ease: "linear",
      });
      AnimateSprite(4, 1, 3000, () => {
        setTimeout(() => {
          setCurrentTile(5);

          setTimeout(() => {
            if (!spriteRef.current) return;
            gsap.to(spriteRef.current.position, {
              x: -3.25,
              duration: 2.8,
              ease: "linear",
            });
            AnimateSprite(5, 8, 3000, () => {
              setTimeout(() => {
                startAnimationSequence(); // Loop back to the beginning
              }, 2000);
            });
          }, 2000);
        }, 2000);
      });
    }, 2000);
  }, []);

  useEffect(startAnimationSequence, [startAnimationSequence]);

  return (
    <group>
      <sprite
        ref={spriteRef}
        position={[-3.25, 0.55, 2.8]}
        receiveShadow
        scale={0.25}
        frustumCulled={false}
      >
        <spriteMaterial
          map={spriteMap}
          premultipliedAlpha={false}
          transparent={true}
        />
      </sprite>
    </group>
  );
};

export default CharSprite;
