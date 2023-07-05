import styled from "styled-components";
import { StyledBackgroundRounded } from "../UI/Background";

export const MessageContainer = styled(StyledBackgroundRounded).attrs(
  (props: { isSent?: boolean; color: string }) => ({
    isSent: props.isSent,
    color: props.color,
  })
)<{ isSent?: boolean; color: string }>`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  background: transparent;
`;

export const UserCircle = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  // border: 2px solid black;
  background-color: ${({ color }) => color};
`;
