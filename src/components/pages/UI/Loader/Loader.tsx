import { useProgress } from "@react-three/drei";
import { Fragment, useEffect, useRef, useState } from "react";
import LoaderMultiplyStyleContainer from "./LoaderMultiplyStyleContainer";
import LoaderStyleContainer from "./LoaderStyleContainer";
import handleLoadingAnimation from "./LoadingAnimation";

const Loader = () => {
  const loaderDivRef = useRef<HTMLDivElement>(null);
  const loaderMultiplyDivRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState("/images/UI/mario/mario_01.png");
  const [currentWhiteImg, setCurrentWhiteImg] = useState(
    "/image/UI/mario/mario_white_01.png",
  );

  const isLoaded = useRef(false);
  const { loaded, total } = useProgress();

  const imgFrames = [
    "/images/UI/mario/mario_01.png",
    "/images/UI/mario/mario_02.png",
  ];
  const imgWhiteFrames = [
    "/images/UI/mario/mario_white_01.png",
    "/images/UI/mario/mario_white_02.png",
  ];

  const handleImgAnim = () => {
    let frameIndex = 0;
    const interval = setInterval(() => {
      frameIndex = (frameIndex + 1) % imgFrames.length;
      setCurrentImg(imgFrames[frameIndex]);
    }, 200);

    return () => clearInterval(interval);
  };
  const handleImgWhiteAnim = () => {
    let frameIndex = 0;
    const interval = setInterval(() => {
      frameIndex = (frameIndex + 1) % imgWhiteFrames.length;
      setCurrentWhiteImg(imgWhiteFrames[frameIndex]);
    }, 200);

    return () => clearInterval(interval);
  };

  useEffect(handleImgAnim, []);
  useEffect(handleImgWhiteAnim, []);

  useEffect(() => {
    if (!loaderDivRef.current || !loaderMultiplyDivRef.current) return;

    if (loaded >= total) {
      isLoaded.current = true;
    }

    handleLoadingAnimation(
      loaderDivRef.current,
      loaderMultiplyDivRef.current,
      isLoaded.current,
    );
  }, [loaded]);

  return (
    <Fragment>
      <LoaderStyleContainer ref={loaderDivRef}>
        <div className="loading-content">
          <img src={currentImg} alt="" />
          <h1>Let's-a go!</h1>
        </div>
      </LoaderStyleContainer>
      <LoaderMultiplyStyleContainer ref={loaderMultiplyDivRef}>
        <div className="loading-content">
          <img src={currentWhiteImg} alt="" />
          <h1>Let's-a go!</h1>
        </div>
      </LoaderMultiplyStyleContainer>
    </Fragment>
  );
};

export default Loader;
