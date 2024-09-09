import { useProgress } from "@react-three/drei";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { shallow } from "zustand/shallow";
import { useGlobalState } from "../../../State/useGlobalState";
import LoaderMultiplyStyleContainer from "./LoaderMultiplyStyleContainer";
import LoaderStyleContainer from "./LoaderStyleContainer";
import handleLoadingAnimation from "./LoadingAnimation";

const Loader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const loaderDivRef = useRef<HTMLDivElement>(null);
  const loaderMultiplyDivRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState(
    "/images/UI/mario/mario_01.webp",
  );
  const [currentWhiteImg, setCurrentWhiteImg] = useState(
    "/images/UI/mario/mario_white_01.webp",
  );

  const { loaded, total } = useProgress();
  const [isFinished, setIsFinished] = useState(false);
  const { currentWeather, forecastWeather } = useGlobalState((state) => {
    return {
      currentWeather: state.currentWeather,
      forecastWeather: state.forecastWeather,
    };
  }, shallow);

  const imgFrames = [
    "/images/UI/mario/mario_01.webp",
    "/images/UI/mario/mario_02.webp",
  ];
  const imgWhiteFrames = [
    "/images/UI/mario/mario_white_01.webp",
    "/images/UI/mario/mario_white_02.webp",
  ];

  const animateImages = useCallback(
    (
      frames: string[],
      setImage: Dispatch<SetStateAction<string>>,
      delay: number,
    ) => {
      let frameIndex = 0;
      const interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        setImage(frames[frameIndex]);
      }, delay);
      return () => clearInterval(interval);
    },
    [],
  );

  useEffect(() => {
    // Play clearAnim1 while loading is in progress
    const clearAnim1 = animateImages(imgFrames, setCurrentImg, 150);

    if (isFinished) {
      clearAnim1(); // Stop clearAnim1 when loading is done
      // Start clearAnim2 for white images
      const clearAnim2 = animateImages(imgWhiteFrames, setCurrentWhiteImg, 150);

      // Trigger loading animation and call onLoadingComplete once it's done
      handleLoadingAnimation(
        loaderDivRef.current!,
        loaderMultiplyDivRef.current!,
        () => {
          onLoadingComplete(); // Notify parent that loading is complete
        },
      );

      return () => clearAnim2(); // Cleanup clearAnim2 on unmount
    }

    return () => clearAnim1(); // Cleanup clearAnim1 when the component unmounts
  }, [isFinished]);

  // Detect when loading is finished
  useEffect(() => {
    if (
      loaded >= total &&
      currentWeather !== null &&
      forecastWeather !== null
    ) {
      setIsFinished(true); // Set loading status to finished
    }
  }, [loaded, total, currentWeather, forecastWeather]);

  return (
    <Fragment>
      <LoaderStyleContainer ref={loaderDivRef}>
        <div className="loading-content">
          <img src={currentImg} alt="Loading" />
          <h1>Let's-a go!</h1>
        </div>
      </LoaderStyleContainer>
      <LoaderMultiplyStyleContainer ref={loaderMultiplyDivRef}>
        <div className="loading-content">
          <img src={currentWhiteImg} alt="Loading" />
          <h1>Let's-a go!</h1>
        </div>
      </LoaderMultiplyStyleContainer>
    </Fragment>
  );
};

export default Loader;
