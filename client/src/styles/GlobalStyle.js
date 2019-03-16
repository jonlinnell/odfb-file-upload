import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');

  html {
    box-sizing: border-box;
    line-height: initial;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }

  body {
    font-family: "DIN Light";
    background-color: #361163;
    color: white;

    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default GlobalStyle;
