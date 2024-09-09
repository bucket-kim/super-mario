import gsap from "gsap";

const handleLoadingAnimation = (
  firstDiv: HTMLDivElement,
  secondDiv: HTMLDivElement,
  onComplete: () => void,
) => {
  const loadingTL = gsap.timeline({ paused: true, onComplete });

  loadingTL
    .fromTo(
      firstDiv,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        overwrite: true,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          firstDiv.style.visibility = "hidden";
        },
      },
    )
    .fromTo(
      secondDiv,
      {
        scale: 1,
      },
      {
        overwrite: true,
        scale: 100,
        duration: 2,
        ease: "sine.inOut",
        onComplete: () => {
          secondDiv.style.visibility = "hidden";
        },
      },
    );

  loadingTL.play();

  return () => loadingTL.clear();
};

export default handleLoadingAnimation;
