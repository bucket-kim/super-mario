import { FC, Fragment, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    snow_land_geo: THREE.Mesh;
  };
};

interface SnowProps {
  nodes: GLTFResult["nodes"];
  [key: string]: any;
}

const Snow: FC<SnowProps> = ({ nodes }) => {
  const snowMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#ebebeb",
    });

    return material;
  }, []);

  return (
    <Fragment>
      <mesh
        name="snow_land_geo"
        castShadow
        receiveShadow
        geometry={nodes.snow_land_geo.geometry}
        position={nodes.snow_land_geo.position}
        material={snowMaterial}
        userData={{ name: "snow_land_geo" }}
      />
    </Fragment>
  );
};

export default Snow;
