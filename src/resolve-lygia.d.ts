declare module "resolve-lygia" {
  import { ShaderMaterial } from "three";

  export function resolveLygia(
    vertexShader: string,
    fragmentShader: string,
  ): ShaderMaterial;
}
