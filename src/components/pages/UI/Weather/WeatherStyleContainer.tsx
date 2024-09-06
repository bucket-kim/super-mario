import styled from "styled-components";

const WeatherStyleContainer = styled.div`
  /* position: fixed;
  top: 0;
  left: 0; */
  height: 8rem;
  color: white;
  font-size: 1.2rem;

  .weather-container {
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    /* align-items: flex-end; */
    justify-content: space-between;

    .weather-top {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .city {
        height: 1rem;
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
        img {
          margin-left: 0.25rem;
          height: 100%;
          object-fit: contain;
        }
      }

      .weather-icon {
        height: 1.25rem;
        img {
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .weather-mid {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .temperature {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
          font-weight: 300;
          font-size: 4rem;
        }
      }
      .weather-details {
        height: 3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
      }
    }
    .weather-bottom {
      display: flex;
      justify-content: space-between;
      .temp-unit {
        font-size: 1.25rem;
        span {
          margin: 0rem 0.4rem;
        }
        button {
          cursor: pointer;
          font-size: 1.25rem;
          color: white;
          border: none;
          background: none;
        }
      }
      .sunrise-timing {
        height: 1.25rem;
        display: flex;
        justify-content: space-between;
        span {
          display: flex;
          flex-direction: column;
          font-size: 0.75rem;

          img {
            height: 100%;
            object-fit: contain;
          }
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
