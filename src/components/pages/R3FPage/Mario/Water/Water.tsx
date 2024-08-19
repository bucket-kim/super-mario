import { useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import * as THREE from "three";
import {
  FloatType,
  MeshDepthMaterial,
  NoBlending,
  RGBADepthPacking,
} from "three";

import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ocean_geo: THREE.Mesh;
    water_geo: THREE.Mesh;
    lake_geo: THREE.Mesh;
  };
};

interface WaterProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const Water: FC<WaterProps> = ({ nodes, ...props }) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const waterMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const oceanRef = useRef<THREE.Mesh>(null);
  const oceanMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const lakeRef = useRef<THREE.Mesh>(null);
  const lakeMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const depthMaterial = new MeshDepthMaterial();
  depthMaterial.depthPacking = RGBADepthPacking;
  depthMaterial.blending = NoBlending;

  const renderTarget = useFBO({
    depth: true,
    type: FloatType,
  });

  useFrame(({ gl, scene, camera, clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (
      !oceanRef.current ||
      !oceanMaterialRef.current ||
      !waterRef.current ||
      !waterMaterialRef.current ||
      !lakeRef.current ||
      !lakeMaterialRef.current
    )
      return;

    // hide the water mesh and render the scene to the target

    oceanRef.current.visible = false;
    waterRef.current.visible = false;
    lakeRef.current.visible = false;

    gl.setRenderTarget(renderTarget);
    scene.overrideMaterial = depthMaterial;
    gl.render(scene, camera);

    // reset the scene and show the water mesh
    scene.overrideMaterial = null;
    oceanRef.current.visible = true;
    waterRef.current.visible = true;
    lakeRef.current.visible = true;
    gl.setRenderTarget(null);

    // set uniforms

    // water uniforms
    waterMaterialRef.current.uniforms.uTime.value = elapsedTime;
    waterMaterialRef.current.uniforms.uDepth.value = renderTarget.texture;

    lakeMaterialRef.current.uniforms.uTime.value = elapsedTime;
    lakeMaterialRef.current.uniforms.uDepth.value = renderTarget.texture;

    oceanMaterialRef.current.uniforms.uTime.value = elapsedTime;
    oceanMaterialRef.current.uniforms.uDepth.value = renderTarget.texture;

    const pixelRatio = gl.getPixelRatio();

    waterMaterialRef.current.uniforms.uResolution.value = [
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio,
    ];
    waterMaterialRef.current.uniforms.uCameraNear.value = camera.near;
    waterMaterialRef.current.uniforms.uCameraFar.value = camera.far;

    // lake uniforms

    lakeMaterialRef.current.uniforms.uResolution.value = [
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio,
    ];
    lakeMaterialRef.current.uniforms.uCameraNear.value = camera.near;
    lakeMaterialRef.current.uniforms.uCameraFar.value = camera.far;

    // ocean uniforms

    oceanMaterialRef.current.uniforms.uResolution.value = [
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio,
    ];
    oceanMaterialRef.current.uniforms.uCameraNear.value = camera.near;
    oceanMaterialRef.current.uniforms.uCameraFar.value = camera.far;
  });

  return (
    <group {...props}>
      <group position={[0, -4, 0]} visible={false}>
        <mesh position={[0, 0, 10]}>
          <boxGeometry args={[40, 10, 1]} />
          <meshStandardMaterial color={"#ffffff"} />
        </mesh>
        <mesh position={[0, 0, -10]}>
          <boxGeometry args={[40, 10, 1]} />
          <meshStandardMaterial color={"#ffffff"} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[10, 0, 0]}>
          <boxGeometry args={[40, 10, 1]} />
          <meshStandardMaterial color={"#ffffff"} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 0, 0]}>
          <boxGeometry args={[40, 10, 1]} />
          <meshStandardMaterial color={"#ffffff"} />
        </mesh>
      </group>
      <mesh
        ref={oceanRef}
        name="ocean_geo"
        castShadow
        receiveShadow
        geometry={nodes.ocean_geo.geometry}
        position={[
          nodes.ocean_geo.position.x - 1.75,
          nodes.ocean_geo.position.y + 0.05,
          nodes.ocean_geo.position.z + 1.75,
        ]}
        userData={{ name: "ocean_geo" }}
        scale={1}
      >
        {/* <meshStandardMaterial color={"#00c3ff"} /> */}
        <oceanMaterial
          ref={oceanMaterialRef}
          uColor={new THREE.Color("#58c5fe")}
          transparent
          uOpacity={1}
          // uNoiseType={noiseType}
          uSpeed={0.5}
          uRepeat={300}
          uFoam={0.6}
          uFoamTop={1}
          uMaxDepth={0.5}
        />
      </mesh>
      <mesh
        ref={waterRef}
        name="water_geo"
        castShadow
        receiveShadow
        geometry={nodes.water_geo.geometry}
        position={nodes.water_geo.position}
        userData={{ name: "water_geo" }}
      >
        <waterMaterial
          ref={waterMaterialRef}
          uColor={new THREE.Color("#58c5fe")}
          transparent
          uOpacity={1}
          // uNoiseType={noiseType}
          uSpeed={1}
          uRepeat={500}
          uFoam={0.3}
          uFoamTop={1}
          uMaxDepth={0.2}
        />
      </mesh>
      <mesh
        ref={lakeRef}
        name="lake_geo"
        castShadow
        receiveShadow
        geometry={nodes.lake_geo.geometry}
        position={nodes.lake_geo.position}
        userData={{ name: "lake_geo" }}
      >
        <waterMaterial
          ref={lakeMaterialRef}
          uColor={new THREE.Color("#58c5fe")}
          transparent
          uOpacity={1}
          // uNoiseType={noiseType}
          uSpeed={0.5}
          uRepeat={2000}
          uFoam={0.7}
          uFoamTop={0.3}
          uMaxDepth={1}
        />
      </mesh>
    </group>
  );
};

export default Water;
