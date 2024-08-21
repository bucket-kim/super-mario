import styled from "styled-components";

const WeatherForecastStyleContainer = styled.div`
  position: fixed;
  top: 10rem;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  .forecast-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0rem 2rem;

    .weather-container {
      color: white;
      background: rgba(0, 0, 0, 0.7);
      width: 14rem;
      height: 11rem;
      padding: 0.5rem;
    }
  }
`;

export default WeatherForecastStyleContainer;
