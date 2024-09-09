import styled from "styled-components";

const LoaderStyleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  color: white;

  .loading-content {
    background: rgba(0, 0, 0, 1);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 10rem;
    }
  }
`;

export default LoaderStyleContainer;
