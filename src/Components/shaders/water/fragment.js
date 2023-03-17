const fragmentShader = `
#include <common>
#include <packing>
#include <fog_pars_fragment>

varying vec2 vUv;
uniform sampler2D tDepth;
uniform sampler2D tDudv;
uniform vec3 waterColor;
uniform vec3 foamColor;
uniform float cameraNear;
uniform float cameraFar;
uniform float uTime;
uniform float threshold;
uniform vec2 resolution;
uniform sampler2D uOverlay;

float getDepth( const in vec2 screenPosition ) {
  #if DEPTH_PACKING == 1
    return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
  #else
    return texture2D( tDepth, screenPosition ).x;
  #endif
}

float getViewZ( const in float depth ) {
  #if ORTHOGRAPHIC_CAMERA == 1
    return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
  #else
    return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
  #endif
}

void main() {

  vec2 screenUV = gl_FragCoord.xy / resolution;

  float fragmentLinearEyeDepth = getViewZ( gl_FragCoord.z );
  float linearEyeDepth = getViewZ( getDepth( screenUV ) );

  float diff = saturate( fragmentLinearEyeDepth - linearEyeDepth );

  vec2 displacement = texture2D( tDudv, ( vUv * 10.0 ) - uTime * 0.05 ).rg;
  displacement = ( ( displacement * 2.0 ) - 1.0 ) * 1.0;
  diff += displacement.x;

  vec4 overlaySample = texture2D(uOverlay, vUv);
  
  vec4 color = vec4(mix( foamColor, waterColor, step( threshold, diff ) ), 1.0);

  vec4 alpha = vec4(overlaySample.w);

  gl_FragColor = color * alpha;
  

  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>

}
`;

export default fragmentShader;
