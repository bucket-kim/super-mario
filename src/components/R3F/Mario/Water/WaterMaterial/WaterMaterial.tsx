import { shaderMaterial } from "@react-three/drei";
import { resolveLygia } from "resolve-lygia";
import { Color } from "three";

const vertexShader = /*glsl*/ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const waterFragmentShader = /*glsl*/ ` 
#include "lygia/generative/pnoise.glsl"

varying vec2 vUv;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uSpeed;
uniform float uRepeat;
// uniform int uNoiseType;
uniform float uFoam;
uniform float uFoamTop;
uniform sampler2D uDepth;
uniform float uMaxDepth;
uniform vec2 uResolution;
uniform float uCameraNear;
uniform float uCameraFar;

#include <packing>

float getViewZ(const in float depth) {
  return perspectiveDepthToViewZ(depth, uCameraNear, uCameraFar);
}

float getDepth(const in vec2 screenPosition ) {
  return unpackRGBAToDepth(texture2D(uDepth, screenPosition));
}



void main() {

  float adjustTime = uTime * uSpeed;

  float noise = 0.0;

  // noise generate
  noise = pnoise(vec3(vUv * uRepeat, adjustTime * 0.5), vec3(100.0, 24.0, 112.0));


  // depth
  vec2 screenUV = gl_FragCoord.xy / uResolution;
  float fragmentLinearEyeDepth = getViewZ(gl_FragCoord.z);
  float linearEyeDepth = getViewZ(getDepth(screenUV));
  
  float depth = fragmentLinearEyeDepth - linearEyeDepth;
  noise += smoothstep(uMaxDepth, 0.0, depth);

  // foam
  noise = smoothstep(uFoam, uFoamTop, noise);

  // color
  vec3 intermediatColor = uColor * 1.8;
  vec3 topColor = intermediatColor * 2.0;

  vec3 finalColor = uColor;
  finalColor = mix(uColor, intermediatColor, step(0.01, noise));
  finalColor = mix (finalColor, topColor, step(1.0, noise));


  // if (depth > uMaxDepth) {
  //   finalColor = vec3(1.0, 0.0, 0.0);
  // } else {
  //   finalColor = vec3(depth);
  // }

  gl_FragColor = vec4(finalColor, uOpacity);

  #include <tonemapping_fragment>
  // #include <encodings_fragment>
}`;
const oceanFragmentShader = /*glsl*/ ` 
#include "lygia/generative/pnoise.glsl"

varying vec2 vUv;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uSpeed;
uniform float uRepeat;
// uniform int uNoiseType;
uniform float uFoam;
uniform float uFoamTop;
uniform sampler2D uDepth;
uniform float uMaxDepth;
uniform vec2 uResolution;
uniform float uCameraNear;
uniform float uCameraFar;

#include <packing>

float getViewZ(const in float depth) {
  return perspectiveDepthToViewZ(depth, uCameraNear, uCameraFar);
}

float getDepth(const in vec2 screenPosition ) {
  return unpackRGBAToDepth(texture2D(uDepth, screenPosition));
}



void main() {

  float adjustTime = uTime * uSpeed;

  float noise = 0.0;

  // noise generate
  noise = pnoise(vec3(vUv * uRepeat, adjustTime * 0.5), vec3(100.0, 24.0, 112.0));


  // depth
  vec2 screenUV = gl_FragCoord.xy / uResolution;
  float fragmentLinearEyeDepth = getViewZ(gl_FragCoord.z);
  float linearEyeDepth = getViewZ(getDepth(screenUV));
  
  float depth = fragmentLinearEyeDepth - linearEyeDepth;
  noise += smoothstep(uMaxDepth, 0.0, depth);

  // foam
  noise = smoothstep(uFoam, uFoamTop, noise);

  // color
  vec3 intermediatColor = uColor * 1.8;
  vec3 topColor = intermediatColor * 2.0;

  // circle
  float circle = 1.0 - smoothstep(0.25 - (0.5 * 0.25), 0.25 + (0.5 * 0.25), dot(vUv - vec2(0.5), vUv - vec2(0.5)) * 8.0);
//   float circle = distance(vUv, vec2(0.5));
//   circle = step(0.5, circle);
// circle = 1.0 - circle;

  vec3 finalColor = uColor;
  finalColor = mix(uColor, intermediatColor, step(0.01, noise));
  finalColor = mix (finalColor, topColor, step(1.0, noise));


  // if (depth > uMaxDepth) {
  //   finalColor = vec3(1.0, 0.0, 0.0);
  // } else {
  //   finalColor = vec3(depth);
  // }

  gl_FragColor = vec4(finalColor, uOpacity) * circle;

  #include <tonemapping_fragment>
  // #include <encodings_fragment>
}`;

export const WaterMaterial = shaderMaterial(
  {
    uColor: new Color("#00c3ff"),
    uOpacity: 1,
    uTime: 0,
    uSpeed: 0.5,
    uRepeat: 20.0,
    uNoiseType: 0,
    uFoam: 0.4,
    uFoamTop: 0.7,
    uDepth: null,
    uMaxDepth: 1.0,
    uResolution: [0, 0],
    uCameraNear: 0,
    uCameraFar: 0,
  },
  vertexShader,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  resolveLygia(waterFragmentShader),
);
export const OceanMaterial = shaderMaterial(
  {
    uColor: new Color("#00c3ff"),
    uOpacity: 1,
    uTime: 0,
    uSpeed: 0.5,
    uRepeat: 20.0,
    uNoiseType: 0,
    uFoam: 0.4,
    uFoamTop: 0.7,
    uDepth: null,
    uMaxDepth: 1.0,
    uResolution: [0, 0],
    uCameraNear: 0,
    uCameraFar: 0,
  },
  vertexShader,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  resolveLygia(oceanFragmentShader),
);
