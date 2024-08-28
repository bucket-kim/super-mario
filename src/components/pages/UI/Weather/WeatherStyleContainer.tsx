import styled from "styled-components";

const WeatherStyleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  width: 100%;

  .weather-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0rem 2rem;
    margin-top: 2rem;
    .weather-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      /* padding: 0.5rem; */
      height: 8rem;
      .weather-place {
        width: 14rem;
        height: 100%;
        display: flex;
        /* align-items: center; */
        justify-content: flex-start;
        /* background: red; */
        h2 {
          /* font-weight: 900; */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .city,
          .condition {
            font-size: 1rem;
            font-weight: 400;
          }

          .city {
            display: flex;
            align-items: center;
            button {
              border: none;
              background: transparent;
              color: white;
              margin-left: 0.4rem;
              height: 1.5rem;
              cursor: pointer;
              img {
                height: 100%;
                object-fit: contain;
              }
            }
          }
          .temperature {
            font-size: 5rem;
            font-weight: 400;
          }
        }
      }

      .weather-icon {
        width: 10rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* background: red; */
        padding: 0.5rem;
        border: #5faaf4 solid 1rem;
        /* border: #ffffff solid 1rem; */
        border-radius: 2rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .weather-details {
        width: 14rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        p {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        /* background: red; */
        /* font-weight: 900; */
        .sunrise-timing {
          margin-top: 1.5rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          span {
            width: 5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }
    }
    .weather-button {
      margin-top: 1rem;
      button {
        cursor: pointer;
        background: transparent;
        border: none;
        width: 4rem;
        img {
          width: 100%;
        }
      }
    }
  }

  @media only screen and (max-width: 440px) {
    .weather-content {
      margin: 0rem 0.75rem;
      margin-top: 0.75rem;
      .weather-container {
        height: 6rem;
        .weather-place {
          width: 7rem;
          h2 {
            .condition {
              font-size: 0.7rem;
            }
            .temperature {
              font-size: 2.25rem;
            }
            .city {
              font-size: 0.7rem;
            }
          }
        }
        .weather-icon {
          width: 7rem;
          border: #5faaf4 solid 0.7rem;
        }
        .weather-details {
          width: 7rem;
          p {
            font-size: 0.7rem;
          }
          .sunrise-timing {
            margin-top: 0.75rem;
            span {
              p {
                font-size: 0.6rem;
              }
              width: 3rem;
            }
          }
        }
      }
    }
  }
`;

export default WeatherStyleContainer;
