import { forwardRef } from "react";
import ArrowSignStyleContainer from "./ArrowSignStyleContainer";

interface ArrowProps {
  handleArrowClick: () => void;
}

export type ArrowRef = HTMLButtonElement;

const ArrowSign = forwardRef<ArrowRef, ArrowProps>(
  ({ handleArrowClick }, ref) => {
    return (
      <ArrowSignStyleContainer className="weather-button">
        <button onClick={handleArrowClick} ref={ref}>
          <img src="/images/weatherui/arrow.png" alt="" />
        </button>
      </ArrowSignStyleContainer>
    );
  },
);

export default ArrowSign;
