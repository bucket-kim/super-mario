import styled from "styled-components";

const WeatherForecastStyleContainer = styled.div`
  position: fixed;
  top: 13rem;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  opacity: 0;
  visibility: hidden;

  .forecast-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0rem 1.5rem;

    .weather-container {
      color: white;
      background: rgba(0, 0, 0, 0.7);
      /* width: 14rem; */
      width: 100%;
      margin: 0.5rem;
      height: 11rem;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .weather-icon {
        /* width: 12rem; */
        height: 4rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .weather-description {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`;

export default WeatherForecastStyleContainer;
