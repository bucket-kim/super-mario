const vertexShader = `
#include <fog_pars_vertex>

uniform float uTime;
varying vec2 vUv;
varying float vZ;

void main() {

	vUv = uv;

	#include <begin_vertex>
	#include <project_vertex>
	#include <fog_vertex>

	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	modelPosition.y += sin(modelPosition.x * 20.0 + uTime * 3.0) * 0.025;
	modelPosition.y += sin(modelPosition.z * 24.0 + uTime * 2.0) * 0.025;
	
	vZ = modelPosition.y;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;

	gl_Position = projectedPosition;

}
`;

export default vertexShader;
