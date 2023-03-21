/*eslint-disable*/

import { useGLTF, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/water/vertex";
import fragmentShader from "./shaders/water/fragment";

const Water = () => {
  const { nodes } = useGLTF("/models/water.glb");

  const { scene, camera, clock } = useThree();

  const waterMesh = useRef();

  const renderer = new THREE.WebGL1Renderer({ antialias: true });

  const depthMaterial = new THREE.MeshDepthMaterial();

  const uniforms = {
    uTime: {
      value: 0,
    },
    threshold: {
      value: 0.5,
    },
    tDudv: {
      value: null,
    },
    tDepth: {
      value: null,
    },
    cameraNear: {
      value: 0,
    },
    cameraFar: {
      value: 0,
    },
    resolution: {
      value: new THREE.Vector2(),
    },
    foamColor: {
      value: new THREE.Color(),
    },
    waterColor: {
      value: new THREE.Color(),
    },
    uOverlay: {
      value: useTexture("./images/alpha.png"),
    },
  };

  const dudvMap = useTexture("https://i.imgur.com/hOIsXiZ.png");

  const pixelRatio = renderer.getPixelRatio();
  const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  renderTarget.texture.minFilter = THREE.NearestFilter;
  renderTarget.texture.magFilter = THREE.NearestFilter;
  renderTarget.texture.generateMipmaps = false;
  renderTarget.stencilBuffer = false;

  renderTarget.depthTexture = new THREE.DepthTexture();
  renderTarget.depthTexture.type = THREE.UnsignedShortType;
  renderTarget.depthTexture.minFilter = THREE.NearestFilter;
  renderTarget.depthTexture.maxFilter = THREE.NearestFilter;

  depthMaterial.depthPacking = THREE.RGBADepthPacking;
  depthMaterial.blending = THREE.NoBlending;

  dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      defines: {
        DEPTH_PACKING: 0,
        ORTHOGRAPHIC_CAMERA: 0,
      },
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib["fog"], uniforms]),
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      fog: true,
      transparent: true,
    });
  }, []);

  waterMaterial.uniforms.cameraNear.value = camera.near;
  waterMaterial.uniforms.cameraFar.value = camera.far;
  waterMaterial.uniforms.resolution.value.set(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  waterMaterial.uniforms.tDudv.value = dudvMap;
  waterMaterial.uniforms.tDepth.value = renderTarget.depthTexture;

  useEffect(() => {
    waterMaterial.uniforms.cameraNear.value = camera.near;
    waterMaterial.uniforms.cameraFar.value = camera.far;
    waterMaterial.uniforms.resolution.value.set(
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio
    );
    waterMaterial.uniforms.tDudv.value = dudvMap;
    waterMaterial.uniforms.tDepth.value = renderTarget.depthTexture;
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const pixelRatio = renderer.getPixelRatio();
      renderTarget.setSize(
        window.innerWidth * pixelRatio,
        window.innerHeight * pixelRatio
      );
      waterMaterial.uniforms.resolution.value.set(
        window.innerWidth * pixelRatio,
        window.innerHeight * pixelRatio
      );
    };
    waterMaterial.uniforms.waterColor.value.set(0xffffff);
    waterMaterial.uniforms.foamColor.value.set(0x2085f6);
    window.addEventListener("resize", onWindowResize);

    // waterMesh.current.visible = false;
    // scene.overrideMaterial = depthMaterial;
    // renderer.setRenderTarget(renderTarget);
    // renderer.render(scene, camera);
    // renderer.setRenderTarget(null);
    // scene.overrideMaterial = null;
    // waterMesh.current.visible = true;
  }, [waterMaterial]);

  useFrame((state) => {
    waterMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      <mesh
        geometry={nodes.water_geo.geometry}
        material={waterMaterial}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color={0x2085f6} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        material={waterMaterial}
        position={[0, 0.05, 0]}
        rotation={[-Math.PI * 0.5, 0, -Math.PI * 0.5]}
      >
        <planeGeometry args={[60, 60, 100, 100]} />
      </mesh>
    </group>
  );
};

export default Water;
