import { createGlobalStyle } from "styled-components";
import { vimium } from "./vimium.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    ont-family: "IBM Plex Sans", sans-serif;
    transition-duration: 2s;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  opacity: 1;

  background: ${(props) =>
    // @ts-ignore
    props.theme.background.primary};


  /* background: linear-gradient(to bottom right, blue, purple); */

  transition-duration: none !important;

  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
  }

  main {
  }
  /*
  background: ${(props) =>
    // @ts-ignore
    props.theme.background.primary};
  */ 
  
  a {
    color: inherit;
    text-decoration: none;
  }

  li{
  }
  /*
  background: ${(props) =>
    // @ts-ignore
    props.theme.background.secondary}
  */ 

  ul, ol{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  /*
  background: ${(props) =>
    // @ts-ignore
    props.theme.background.primary}
  */ 
    code{
      font-family: monospace;
    }
  ${vimium}
`;

export default GlobalStyle;
