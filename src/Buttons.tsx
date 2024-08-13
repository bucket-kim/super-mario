/*eslint-disable*/
import { Html } from "@react-three/drei";
import "../button.css";
import datas from "./datas";

const Buttons = () => {
  return (
    <>
      {datas.map((data) => {
        return (
          <Html
            wrapperClass="label"
            occlude
            position={[data.position[0], data.position[1], data.position[2]]}
            key={data.key}
          >
            <h1>{data.name}</h1>
            <p>{data.information}</p>
            <img src={data.image} alt={data.name} />
          </Html>
        );
      })}
    </>
  );
};

export default Buttons;
