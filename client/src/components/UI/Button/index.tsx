import styled from "styled-components";

export const SmallButton = styled.button<{
  sttingOn: boolean | undefined | null;
}>`
  background: ${({ theme }) => theme.background.primary};
  color: ${(props) => (props.color ? props.color : props.theme.color.primary)};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  //  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    border: 1px solid ${({ theme }) => theme.color.primary};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.background.primary};
  }
`;
