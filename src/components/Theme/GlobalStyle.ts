import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` 
  // Resetting margins, paddings, and borders
  h1, h2, h3, h4, h5, h6,
  a, p, span,
  em, small, strong,
  sub, sup,
  mark, del, ins, strike,
  abbr, dfn,
  blockquote, q, cite,
  code, pre,
  ol, ul, li, dl, dt, dd, section, article, aside, hgroup, footer,
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
  body {
    overflow-x: hidden;
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Quicksand', sans-serif;
  }

  input, textarea, button {
    font-family: inherit
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      cursor: pointer;
    }
  }

  // Layout & box sizing
  * {
    box-sizing: border-box;
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
`;

export default GlobalStyle;
