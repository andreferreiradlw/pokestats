import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: local('Montserrat'), url(/fonts/Montserrat-Regular.ttf) format('truetype');
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-display: block;
  src: local('Montserrat'), url(/fonts/Montserrat-Medium.ttf) format('truetype');
}

@font-face {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-display: block;
  src: local('Quicksand'), url(/fonts/Quicksand-SemiBold.ttf) format('truetype');
}

@font-face {
  font-family: 'Josefin Sans';
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: local('Josefin Sans'), url(/fonts/JosefinSans-Bold.ttf) format('truetype');
}

@font-face {
  font-family: 'Josefin Sans';
  font-style: italic;
  font-weight: 700;
  font-display: block;
  src: local('Josefin Sans'), url(/fonts/JosefinSans-BoldItalic.ttf) format('truetype');
}

  // Resetting margins, paddings, and borders
  html, body,
  h1, h2, h3, h4, h5, h6,
  a, p, span,
  em, small, strong,
  sub, sup,
  mark, del, ins, strike,
  abbr, dfn,
  blockquote, q, cite,
  code, pre,
  ol, ul, li, dl, dt, dd,
  div, section, article,
  main, aside, nav,
  header, hgroup, footer,
  img, figure, figcaption,
  address, time,
  audio, video,
  canvas, iframe,
  details, summary,
  fieldset, form, label, legend,
  table, caption,
  tbody, tfoot, thead,
  tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    
  }

  // typography
  html {
    font-size: 100%;
  }
  body {
    overflow-x: hidden;
    width: 100%;
    min-height: 100%;
    font-size: 1rem;
    margin: 0;
    background-color: white;
    font-family: 'Montserrat', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Quicksand', sans-serif;
  }
  input, textarea, button {
    font-family: inherit
  }
  a {
    text-decoration: none;
  }

  // Layout & box sizing
  article,
  aside,
  footer,
  header,
  nav,
  section,
  main {
    display: block;
  }
  * {
    box-sizing: border-box;
  }
  *:before,
  *:after {
    box-sizing: inherit;
  }

  // Resetting specific element styles
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  ol,
  ul {
    list-style: none;
  }
  img,
  video {
    max-width: 100%;
  }
  img {
    border-style: none;
    height: auto;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:after,
  blockquote:before,
  q:after,
  q:before {
    content: "";
    content: none;
  }

  // Attributes & states
  [hidden] {
    display: none !important;
  }
  [disabled] {
    cursor: not-allowed;
  }
  :focus:not(:focus-visible) {
    outline: none;
  }

  // lazy load
  .lazyload-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export default GlobalStyle;
