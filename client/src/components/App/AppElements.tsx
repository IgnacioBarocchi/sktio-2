import styled from "styled-components";
import { StyledBackground } from "../UI/Background";

export const AppContainer = styled.main`
  position: absolute;
  top: 0;
  left: 2.5%;
  height: 100vh;
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  /*display: grid;*/
  grid-template-columns: 0.4fr 1.2fr;
  gap: 0px 40px;
  grid-template-areas: "aside-column chat-column";
  background: ${(props) =>
    // @ts-ignore
    props.theme.background.primary};

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.4fr 1.2fr;
    grid-template-areas: "aside-column chat-column";
  }
`;

export const ChatColumn = styled(StyledBackground)`
  grid-area: chat-column;
  height: 100vh;
`;
