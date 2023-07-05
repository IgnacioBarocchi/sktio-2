import styled from "styled-components";
import UI from "../../../constants/UI";

const dm = UI.dimensions.map.get("scrollbar-width") + "px";

export const Ol = styled.ol`
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    width: ${dm};
  }

  ::-webkit-scrollbar-track {
    border-radius: 5px;
    background: transparent;
    border: 1px solid transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: transparent;
    border: 1px solid transparent;
    outline: none;
  }

  &:hover {
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.background.primary};
      border: 1px solid ${({ theme }) => theme.background.secondary};
    }

    ::-webkit-scrollbar-thumb {
      border: 1px solid ${({ theme }) => theme.color.tertiary};
      background: ${({ theme }) => theme.background.primary};
      &:hover {
        background: ${({ theme }) => theme.color.tertiary};
      }
      outline: none;
    }
  }
`;
