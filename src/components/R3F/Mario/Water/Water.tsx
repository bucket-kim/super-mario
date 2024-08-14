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
  };
};

interface WaterProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const Water: FC<WaterProps> = ({ nodes, ...props }) => {
  const waterRef = useRef<THREE.ShaderMaterial>(null);
  const oceanRef = useRef<THREE.ShaderMaterial>(null);

  const depthMaterial = new MeshDepthMaterial();
  depthMaterial.depthPacking = RGBADepthPacking;
  depthMaterial.blending = NoBlending;

  const renderTarget = useFBO({
    depth: true,
    type: FloatType,
  });

  useFrame(({ gl, scene, camera, clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (!waterRef.current || !oceanRef.current) return;

    // hide the water mesh and render the scene to the target
    waterRef.current.visible = false;
    oceanRef.current.visible = false;
    gl.setRenderTarget(renderTarget);
    scene.overrideMaterial = depthMaterial;
    gl.render(scene, camera);

    // reset the scene and show the water mesh
    scene.overrideMaterial = null;
    waterRef.current.visible = true;
    oceanRef.current.visible = true;
    gl.setRenderTarget(null);

    const pixelRatio = gl.getPixelRatio();
    // set uniforms
    // waterRef.current.uniforms.uTime.value = elapsedTime;
    // waterRef.current.uniforms.uDepth.value = renderTarget.texture;
    // waterRef.current.uniforms.uResolution.value = [
    //   window.innerWidth * pixelRatio,
    //   window.innerHeight * pixelRatio,
    // ];
    // waterRef.current.uniforms.uCameraNear.value = camera.near;
    // waterRef.current.uniforms.uCameraFar.value = camera.far;

    // ocean uniforms
    oceanRef.current.uniforms.uTime.value = elapsedTime;
    oceanRef.current.uniforms.uDepth.value = renderTarget.texture;
    oceanRef.current.uniforms.uResolution.value = [
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio,
    ];
    oceanRef.current.uniforms.uCameraNear.value = camera.near;
    oceanRef.current.uniforms.uCameraFar.value = camera.far;
  });

  return (
    <group {...props}>
      <group position={[0, -4, 0]}>
        <mesh position={[0, -5, 0]}>
          <boxGeometry args={[20, 1, 20]} />
          <meshStandardMaterial color={"#ea4d10"} />
        </mesh>
        <mesh position={[0, 0, 9.5]}>
          <boxGeometry args={[20, 10, 1]} />
          <meshStandardMaterial color={"#ea4d10"} />
        </mesh>
        <mesh position={[0, 0, -9.5]}>
          <boxGeometry args={[20, 10, 1]} />
          <meshStandardMaterial color={"#ea4d10"} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[10, 0, 0]}>
          <boxGeometry args={[20, 10, 1]} />
          <meshStandardMaterial color={"#ea4d10"} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 0, 0]}>
          <boxGeometry args={[20, 10, 1]} />
          <meshStandardMaterial color={"#ea4d10"} />
        </mesh>
      </group>
      <mesh
        name="ocean_geo"
        castShadow
        receiveShadow
        geometry={nodes.ocean_geo.geometry}
        position={[
          nodes.ocean_geo.position.x,
          nodes.ocean_geo.position.y + 0.05,
          nodes.ocean_geo.position.z,
        ]}
        userData={{ name: "ocean_geo" }}
        // position={[0, 0.1, 0]}
      >
        {/* <meshStandardMaterial color={"#00c3ff"} /> */}
        <waterMaterial
          ref={oceanRef}
          uColor={new THREE.Color("#00c3ff")}
          transparent
          uOpacity={1}
          // uNoiseType={noiseType}
          uSpeed={0.5}
          uRepeat={80}
          uFoam={0.4}
          uFoamTop={10}
          uMaxDepth={5}
        />
      </mesh>
      <mesh
        name="water_geo"
        castShadow
        receiveShadow
        geometry={nodes.water_geo.geometry}
        position={nodes.water_geo.position}
        userData={{ name: "water_geo" }}
      >
        <waterMaterial
          ref={waterRef}
          uColor={new THREE.Color("#00c3ff")}
          transparent
          uOpacity={1}
          // uNoiseType={noiseType}
          uSpeed={0.5}
          uRepeat={80}
          uFoam={0.4}
          uFoamTop={10}
          uMaxDepth={5}
        />
      </mesh>
    </group>
  );
};

export default Water;
