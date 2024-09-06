import styled from "styled-components";

const WeatherForecastStyleContainer = styled.div`
  /* margin: 0rem 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;

  font-weight: 500;

  .forecast-header {
    display: flex;
    p {
      margin-right: 1rem;
    }
  }
  .forecast-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
    /* padding: 0rem 1.5rem; */

    .weather-container {
      width: 100%;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: #ffffff 1.5px solid;

      .weather-date {
        color: #ffffff;
      }

      .weather-icon {
        /* width: 12rem; */
        height: 1.6rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .weather-description {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          margin: 0rem 0.2rem;
        }
        p:nth-child(2) {
          color: #ffffff;
        }
      }
    }
    .weather-container:nth-last-child(1) {
      border: none;
    }
  }
`;

export default WeatherForecastStyleContainer;
