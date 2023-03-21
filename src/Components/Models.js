import React from "react";
import Buttons from "./Buttons";
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
    </group>
  );
};

export default Models;
