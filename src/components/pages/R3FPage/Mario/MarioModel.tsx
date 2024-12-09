import { useGLTF, useTexture } from "@react-three/drei";
import { FC, useMemo } from "react";
import * as THREE from "three";
import Buttons from "./Buttons/Buttons";
import CharSprite from "./Character/CharSprite";
import Clouds from "./Clouds/Clouds";
import ColorButtons from "./ColorButtons/ColorButtons";
import Eyeball from "./Eyeball/Eyeball";
import BubbleGas from "./Land/BubbleGas/BubbleGas";
import Land from "./Land/Land";
import { GLTFResult } from "./MarioModelTypes";
import Snow from "./Snow/Snow";
import Water from "./Water/Water";

interface MarioModelProps {
  position: THREE.Vector3;
  currentWeather: any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MarioModel: FC<MarioModelProps> = ({ position, currentWeather }) => {
  const { nodes } = useGLTF("/models/MarioModel.glb") as unknown as GLTFResult;

  const landColorMap = useTexture("/images/textures/land/land_BaseColor.png");

  const landRoughnessMap = useTexture(
    "/images/textures/land/land_Roughness.png",
  );
  const landNormalMap = useTexture("/images/textures/land/land_Normal.png");
  const landAoMap = useTexture("/images/textures/land/land_AO.png");

  const itemsColorMap = useTexture(
    "/images/textures/items/items_BaseColor.png",
  );
  const itemsRoughnessMap = useTexture(
    "/images/textures/items/items_Roughness.png",
  );
  const itemsNormalMap = useTexture("/images/textures/items/items_Normal.png");
  const itemsAoMap = useTexture("/images/textures/items/items_AO.png");

  const landMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: landColorMap,
      roughnessMap: landRoughnessMap,
      normalMap: landNormalMap,
      aoMap: landAoMap,
      aoMapIntensity: 0.2,
      side: THREE.DoubleSide,
    });

    landColorMap.flipY = false;
    landRoughnessMap.flipY = false;
    landNormalMap.flipY = false;
    landAoMap.flipY = false;

    landColorMap.colorSpace = THREE.SRGBColorSpace;

    return material;
  }, [landAoMap, landColorMap, landNormalMap, landRoughnessMap]);

  const itemMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: itemsColorMap,
      roughnessMap: itemsRoughnessMap,
      normalMap: itemsNormalMap,
      aoMap: itemsAoMap,
      aoMapIntensity: 0.2,
      side: THREE.DoubleSide,
    });

    itemsColorMap.flipY = false;
    itemsRoughnessMap.flipY = false;
    itemsNormalMap.flipY = false;
    itemsAoMap.flipY = false;

    itemsColorMap.colorSpace = THREE.SRGBColorSpace;

    return material;
  }, [itemsAoMap, itemsColorMap, itemsNormalMap, itemsRoughnessMap]);

  return (
    <group position={position} dispose={null}>
      <BubbleGas />

      <Buttons nodes={nodes} />
      <ColorButtons nodes={nodes} buttonMaterial={itemMaterial} />
      {currentWeather === "Snow" && <Snow nodes={nodes} />}
      <Land
        nodes={nodes}
        landMaterial={landMaterial}
        itemMaterial={itemMaterial}
      />
      <Clouds nodes={nodes} />
      <Eyeball nodes={nodes} />
      <Water nodes={nodes} position={[0, 0.0, 0.0]} />
      <CharSprite />
    </group>
  );
};

export default MarioModel;

useGLTF.preload("/models/marioModel.glb");
