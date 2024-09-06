import gsap from "gsap";

const arrowAnimation = gsap.timeline({ paused: true });

const handleArrowAnimation = (
  arrowButtonRef: HTMLButtonElement,
  clicked: boolean,

  complete: void,
) => {
  gsap.killTweensOf(arrowAnimation);

  arrowAnimation.to(arrowButtonRef, {
    rotateX: clicked ? 180 : 0,
    transformOrigin: "center",
    overwrite: true,
    duration: 0.5,
    onComplete: () => {
      complete;
    },
  });

  arrowAnimation.play();

  return () => {
    arrowAnimation.clear();
  };
};

export { handleArrowAnimation };
