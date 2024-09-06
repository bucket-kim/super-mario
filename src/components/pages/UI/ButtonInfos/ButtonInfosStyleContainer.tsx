import styled from "styled-components";

const ButtonInfosStyleContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  opacity: 0;
  visibility: hidden;
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
  transform: translate(-50%, -50%);

  .info-container {
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 1rem;
    height: 42rem;
    width: 36rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    /* height: 32rem; */

    button {
      background: none;
      border: none;
      position: absolute;
      top: 1rem;
      left: 1rem;
      cursor: pointer;
      img {
        width: 2rem;
      }
    }

    .img-content {
      margin-top: 1.5rem;
      width: 30rem;
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
      font-size: 1.5rem;
    }

    .info-content {
      width: 100%;
      margin: 1rem 0rem;
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 932px) and (max-height: 430px) {
    .info-container {
      width: 24rem;
      height: 100%;
      button {
        img {
          width: 1rem;
        }
      }
      .img-content {
        width: 20rem;
      }
      .title-content {
        font-size: 0.85rem;
        margin: 0rem;
      }
      .info-content {
        margin: 0.5rem 0rem;
        font-size: 0.75rem;
      }
    }
  }
  @media only screen and (max-width: 440px) {
    .info-container {
      width: 24rem;
      height: 100%;
      button {
        img {
          width: 1rem;
        }
      }
      .img-content {
        width: 20rem;
      }
      .title-content {
        font-size: 0.85rem;
        margin: 0rem;
      }
      .info-content {
        margin: 0.5rem 0rem;
        font-size: 0.75rem;
      }
    }
  }
`;

export default ButtonInfosStyleContainer;
