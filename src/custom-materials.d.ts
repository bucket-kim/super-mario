// custom-materials.d.ts
import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterMaterial: {
        uColor?: THREE.Color | string;
        uOpacity?: number;
        transparent?: boolean;
        [key: string]: any; // Allow other props as well
      };
    }
  }
}
