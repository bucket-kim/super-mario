import React from "react";
import Buttons from "./Buttons";
import Cloud from "./Cloud";
import Items from "./Items";
import Land from "./Land";
import Water from "./Water";

const Models = (props) => {
  return (
    <group position={props.position}>
      <Land />
      <Items />
      <Buttons />
      <Water />
      <Cloud />
    </group>
  );
};

export default Models;
