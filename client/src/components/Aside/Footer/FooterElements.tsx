import { styled } from "styled-components";

export const FooterContainer = styled.footer`
  padding: 0.5rem;
  border-top: 1px solid white;
  background: purple;
  height: 100%;
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

export const FeaturesContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
`;
