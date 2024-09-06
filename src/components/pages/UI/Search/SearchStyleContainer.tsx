import styled from "styled-components";

const SearchStyleContainer = styled.div`
  /* position: fixed;
  top: 11rem;
  left: 2rem;
  z-index: 2; */

  .search-content {
    input {
      width: 16rem;
      background: transparent;
    }
  }

  @media only screen and (max-width: 440px) {
    top: 7rem;
    left: 0.5rem;
    .search-content {
      input {
        width: 7rem;
        height: 1rem;
      }
    }
  }
`;

export default SearchStyleContainer;
