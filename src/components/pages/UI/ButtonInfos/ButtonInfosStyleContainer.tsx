import styled from "styled-components";

const ButtonInfosStyleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  color: white;
  font-family:
    -apple-system,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
  /* pointer-events: none; */

  .info-container {
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    width: 32rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* height: 32rem; */

    .img-content {
      width: 100%;
      object-fit: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .title-content {
      text-align: center;
      width: 100%;
      margin: 1rem 0rem;
    }

    .info-content {
      width: 100%;
      margin: 1rem 0rem;
      line-height: 1.5rem;
    }
  }
`;

export default ButtonInfosStyleContainer;
