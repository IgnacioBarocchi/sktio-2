import { Children } from "react";
import styled from "styled-components";
import { SmallText } from "../Text";

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
`;

const TooltipText = styled.span`
  visibility: hidden;
  background-color: ${({ theme }) => theme.background.secondary};
  color: #000000;
  border-radius: 6px;
  padding: 6px 12px;
  position: absolute;
  z-index: 1000;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const TooltipIcon = styled.i`
  display: inline-block;
  margin-left: 8px;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;

  &:hover + ${TooltipText} {
    visibility: visible;
    opacity: 1;
  }
`;

// @ts-ignore
export const Tooltip = ({ children, icon, text }) => (
  <TooltipContainer>
    {children}
    <TooltipIcon>{icon}</TooltipIcon>
    <TooltipText>
      <SmallText>{text}</SmallText>
    </TooltipText>
  </TooltipContainer>
);
