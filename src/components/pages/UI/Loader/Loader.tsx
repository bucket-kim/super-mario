import { useProgress } from "@react-three/drei";
import { Fragment, useEffect, useRef } from "react";
import LoaderMultiplyStyleContainer from "./LoaderMultiplyStyleContainer";
import LoaderStyleContainer from "./LoaderStyleContainer";
import handleLoadingAnimation from "./LoadingAnimation";

const Loader = () => {
  const loaderDivRef = useRef<HTMLDivElement>(null);
  const loaderMultiplyDivRef = useRef<HTMLDivElement>(null);

  const isLoaded = useRef(false);
  const { loaded, total } = useProgress();

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
          <h1>Loading</h1>
        </div>
      </LoaderStyleContainer>
      <LoaderMultiplyStyleContainer ref={loaderMultiplyDivRef}>
        <div className="loading-content">
          <h1>Loading</h1>
        </div>
      </LoaderMultiplyStyleContainer>
    </Fragment>
  );
};

export default Loader;
