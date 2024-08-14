/*eslint-disable*/
// import "../button.css";
import gsap from "gsap";
import { FC, useEffect, useRef } from "react";
import { useGlobalState } from "../../../State/useGlobalState";
import ButtonInfosStyleContainer from "./ButtonInfosStyleContainer";

interface ButtonData {
  key: number;
  name: string;
  title: string;
  information: string;
  image: string;
}

interface ButtonDetailsProps {
  data: ButtonData;
}

const ButtonInfos: FC<ButtonDetailsProps> = ({ data }) => {
  const { buttonIndex } = useGlobalState((state) => {
    return {
      buttonIndex: state.buttonIndex,
    };
  });

  const htmlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!htmlRef.current) return;
    if (buttonIndex === data.name) {
      gsap.to(htmlRef.current, {
        opacity: 1,
        visibility: "visible",
        overwrite: true,
      });
    } else {
      gsap.to(htmlRef.current, {
        opacity: 0,
        overwrite: true,
        onComplete: () => {
          if (!htmlRef.current) return;
          htmlRef.current.style.visibility = "hidden";
        },
      });
    }
  }, [buttonIndex]);

  console.log(buttonIndex);

  return (
    <ButtonInfosStyleContainer ref={htmlRef} key={data.key}>
      <div className="info-container">
        <div className="img-content">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="title-content">
          <h1>- {data.title} -</h1>
        </div>
        <div className="info-content">
          <p>{data.information}</p>
        </div>
      </div>
    </ButtonInfosStyleContainer>
  );
};

export default ButtonInfos;
