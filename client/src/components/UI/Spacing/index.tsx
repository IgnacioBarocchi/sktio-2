import styled from "styled-components";

export const FlexBoxWithSpacing = styled.div<{
  gap: number | string;
  column?: boolean;
}>`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: center;
  justify-content: ${({ gap }) => (typeof gap === "string" ? gap : "")};

  & > *:not(:last-child) {
    ${({ column, gap }) =>
      `margin-${column ? "bottom" : "right"}:${
        typeof gap === "number" ? gap + "px" : ""
      }`}
  }
`;
