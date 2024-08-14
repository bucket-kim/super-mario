import { memo, ReactNode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// eslint-disable-next-line react-refresh/only-export-components
const Theme = {
  light4HGreen: "#339966",
  dark4HGreen: "#004438",
  light4hYellow: "#F5C952",
  light4hred: "#F54359",
};

// eslint-disable-next-line react-refresh/only-export-components
const GlobalStyles = createGlobalStyle`

@font-face {
  font-family:   -apple-system,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            'Open Sans',
            'Helvetica Neue',
            sans-serif;
}

    * {
        -webkit-tap-highlight-color: transparent;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    body {
      touch-action: none;
      width: 100vw; 
      height: 100vh;
      overflow: hidden;
    }

    main {
      margin: 0 auto;
      width: 100%;  
      height: 100%;
      position: relative;
    }

    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    figure,
    fieldset,
    button,
    ul,
    li,
    p,
    pre {
      margin: 0;
      padding: 0 ;
    }
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
  `;
// eslint-disable-next-line react-refresh/only-export-components
const StyleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(StyleProvider);
