import styled from "styled-components";

const LoaderMultiplyStyleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  color: white;
  background: rgba(0, 0, 0, 1);
  mix-blend-mode: multiply;
  font-family: "Roboto", sans-serif;

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 7rem;
    width: 7rem;

    img {
      width: 100%;
      object-fit: contain;
      margin-bottom: 1rem;
    }

    h1 {
      text-align: center;
      font-weight: 400;
      letter-spacing: 0.05rem;
      width: 15rem;
    }
  }

  @media only screen and (max-width: 932px) {
    .loading-content {
      height: 4rem;
      width: 4rem;
    }
  }
`;

export default LoaderMultiplyStyleContainer;
