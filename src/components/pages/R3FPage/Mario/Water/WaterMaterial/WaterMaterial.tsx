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
// #include "lygia/generative/pnoise.glsl"

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
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}
void main() {

  float adjustTime = uTime * uSpeed;

  float noise = 0.0;

  // noise generate
  noise = cnoise(vec3(vUv * uRepeat, adjustTime * 0.5));


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
// #include "lygia/generative/pnoise.glsl"

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
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}
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
  noise = cnoise(vec3(vUv * uRepeat, adjustTime * 0.5));


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
