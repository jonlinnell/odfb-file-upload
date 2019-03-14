import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }

  body {
    background-color: #eaeaea;

    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default GlobalStyle;
