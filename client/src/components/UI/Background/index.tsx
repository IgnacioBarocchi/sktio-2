import "react-tabs/style/react-tabs.css";
import styled, { css, keyframes } from "styled-components";
import { Skin } from "../../../constants/Skin";

const getBackgroundStyle = (skin: string) => {
  switch (skin) {
    case "glass":
      return css`
        background: rgba(236, 236, 236, 0.25);
        // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.18);
      `;
    case "neuro":
      return css`
        background: #e0e0e0;
        // box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff;
        color: black;
      `;
    default:
      return css`
        background-color: ${(props) => props.theme.background.primary};
        color: ${(props) => props.theme.color.primary};
        border: none;
        font-size: ${(props) => props.theme.fontSizes.md};
      `;
  }
};

/*${getBackgroundStyle(Skin)}*/
export const StyledBackground = styled.div``;

export const StyledBackgroundRounded = styled(StyledBackground)`
  border-radius: 10px;
`;
