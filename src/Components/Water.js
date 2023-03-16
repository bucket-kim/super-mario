/*eslint-disable*/

import { useGLTF, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/water/vertex";
import fragmentShader from "./shaders/water/fragment";

const Water = () => {
  const { nodes } = useGLTF("/models/water.glb");

  const { scene, gl, camera } = useThree();

  const waterMesh = useRef();

  const renderer = useMemo(() => {
    return new THREE.WebGL1Renderer({ antialias: true });
  }, []);

  const supportsDepthTextureExtension = !!renderer.extensions.get(
    "WEBGL_depth_texture"
  );

  const depthMaterial = useMemo(() => {
    return new THREE.MeshDepthMaterial();
  });

  const uniforms = useMemo(
    () => ({
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
    }),
    []
  );

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

  if (supportsDepthTextureExtension === true) {
    renderTarget.depthTexture = new THREE.DepthTexture();
    renderTarget.depthTexture.type = THREE.UnsignedShortType;
    renderTarget.depthTexture.minFilter = THREE.NearestFilter;
    renderTarget.depthTexture.maxFilter = THREE.NearestFilter;
  }

  depthMaterial.depthPacking = THREE.RGBADepthPacking;
  depthMaterial.blending = THREE.NoBlending;

  dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      defines: {
        DEPTH_PACKING: supportsDepthTextureExtension === true ? 0 : 1,
        ORTHOGRAPHIC_CAMERA: 0,
      },
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib["fog"], uniforms]),
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      fog: true,
    });
  });

  waterMaterial.uniforms.cameraNear.value = camera.near;
  waterMaterial.uniforms.cameraFar.value = camera.far;
  waterMaterial.uniforms.resolution.value.set(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  waterMaterial.uniforms.tDudv.value = dudvMap;
  waterMaterial.uniforms.tDepth.value =
    supportsDepthTextureExtension === true
      ? renderTarget.depthTexture
      : renderTarget.texture;

  useEffect(() => {
    waterMaterial.uniforms.foamColor.value.set(0xffffff);
    waterMaterial.uniforms.waterColor.value.set(0x2085f6);
  }, [waterMaterial]);

  useFrame((state) => {
    waterMesh.current.visible = false;
    scene.overrideMaterial = depthMaterial;
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    waterMaterial.uniforms.uTime.value = state.clock.elapsedTime;

    scene.overrideMaterial = null;
    waterMesh.current.visible = true;
  });

  return (
    <group ref={waterMesh}>
      <mesh
        geometry={nodes.water_geo.geometry}
        material={waterMaterial}
        receiveShadow
        castShadow
      />
      <mesh
        castShadow
        receiveShadow
        material={waterMaterial}
        geometry={nodes.ocean_geo.geometry}
        position={[0, 0.05, 0]}
      ></mesh>
    </group>
  );
};

export default Water;
