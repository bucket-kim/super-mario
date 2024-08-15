import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import Buttons from "./Buttons/Buttons";
import Clouds from "./Clouds/Clouds";
import ColorButtons from "./ColorButtons/ColorButtons";
import Land from "./Land/Land";
import Water from "./Water/Water";

type GLTFResult = GLTF & {
  nodes: {
    blueButton_geo: THREE.Mesh;
    button_01: THREE.Mesh;
    button_02: THREE.Mesh;
    button_03: THREE.Mesh;
    button_04: THREE.Mesh;
    button_05: THREE.Mesh;
    button_06: THREE.Mesh;
    button_07: THREE.Mesh;
    button_08: THREE.Mesh;
    button_09: THREE.Mesh;
    button_10: THREE.Mesh;
    button_11: THREE.Mesh;
    button_12: THREE.Mesh;
    button_13: THREE.Mesh;
    button_14: THREE.Mesh;
    button_15: THREE.Mesh;
    button_16: THREE.Mesh;
    button_17: THREE.Mesh;
    button_18: THREE.Mesh;
    button_19: THREE.Mesh;
    button_20: THREE.Mesh;
    button_21: THREE.Mesh;
    button_22: THREE.Mesh;
    button_23: THREE.Mesh;
    button_24: THREE.Mesh;
    button_25: THREE.Mesh;
    cloud001: THREE.Mesh;
    cloud002: THREE.Mesh;
    cloud003: THREE.Mesh;
    cloud004: THREE.Mesh;
    cloud005: THREE.Mesh;
    cloud006: THREE.Mesh;
    cloud007: THREE.Mesh;
    cloud008: THREE.Mesh;
    cloud009: THREE.Mesh;
    eyeball_geo: THREE.Mesh;
    items_geo: THREE.Mesh;
    land_geo: THREE.Mesh;
    ocean_geo: THREE.Mesh;
    water_geo: THREE.Mesh;
    lake_geo: THREE.Mesh;
    greenButton_geo: THREE.Mesh;
    yellowButton_geo: THREE.Mesh;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MarioModel = (props: any) => {
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
  }, []);

  const itemMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: itemsColorMap,
      roughnessMap: itemsRoughnessMap,
      normalMap: itemsNormalMap,
      aoMap: itemsAoMap,
      aoMapIntensity: 0.2,
    });

    itemsColorMap.flipY = false;
    itemsRoughnessMap.flipY = false;
    itemsNormalMap.flipY = false;
    itemsAoMap.flipY = false;

    itemsColorMap.colorSpace = THREE.SRGBColorSpace;

    return material;
  }, []);

  return (
    <group {...props} dispose={null}>
      <Land
        nodes={nodes}
        landMaterial={landMaterial}
        itemMaterial={itemMaterial}
      />
      <Water nodes={nodes} position={[0, 0.0, 0.0]} />
      <Buttons nodes={nodes} />
      <Clouds nodes={nodes} />
      <ColorButtons nodes={nodes} buttonMaterial={itemMaterial} />
      {/* <mesh scale={4}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </group>
  );
};

export default MarioModel;

useGLTF.preload("/models/marioModel.glb");
