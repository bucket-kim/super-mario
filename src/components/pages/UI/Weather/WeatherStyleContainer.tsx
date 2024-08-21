import styled from "styled-components";

const WeatherStyleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  font-size: 1.2rem;

  .weather-container {
    margin: 0rem 2rem;
    /* background: red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    .weather-place {
      width: 12rem;
      height: 8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      h2 {
        font-weight: 900;
      }
      /* background: red; */
    }

    .weather-temperature {
      width: 12rem;
      height: 8rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /* background: red; */
    }

    .weather-icon {
      width: 12rem;
      height: 8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      /* background: red; */
      padding: 1rem;
      border: #ffffff solid 1rem;
      border-radius: 2rem;
    }

    .weather-feel-like {
      color: #fddc75;
      width: 12rem;
      height: 8rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      /* background: red; */
    }
    .weather-details {
      width: 12rem;
      height: 8rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      /* background: red; */
      font-weight: 900;
    }
  }
`;

export default WeatherStyleContainer;
