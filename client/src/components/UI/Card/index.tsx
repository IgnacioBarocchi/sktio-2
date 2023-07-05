import styled, { css } from "styled-components";
import { BigText, MediumText } from "../Text";
import { ReactNode } from "react";

interface CardProps {
  glow?: boolean;
  background?: "primary" | "secondary" | "tertiary";
  custom?: boolean;
  customTitle?: ReactNode;
  customBody?: ReactNode;
  customFooter?: ReactNode;
  title?: string;
  body?: string;
  footer?: string;
}

interface CardContainerProps {
  glow?: boolean;
  background?: string;
}

const shouldGlow = (glow: boolean = false) =>
  glow
    ? css`
        box-shadow: 0 0 0.42rem 0.21rem ${({ theme }) => theme.color.tertiary},
          /* inner */ 0 0 0.71rem 0.42rem
            ${({ theme }) => theme.color.secondary},
          /* middle */ 0 0 1rem 0.64rem
            ${({ theme }) => theme.color.lowContrast}; /* outer */
      `
    : "";

export const CardContainer = styled.div<CardContainerProps>`
  border: 1px solid ${({ theme }) => theme.color.lowContrast};
  border-radius: 25px;
  padding: 1rem;
  margin: 1rem;
  background: ${({ theme, background }) =>
    theme.background[!background ? "primary" : background]};
  ${({ glow }) => shouldGlow(glow)}
`;

export const Card = ({
  body,
  title,
  footer,
  glow,
  background,
  customTitle,
  customBody,
  customFooter,
}: CardProps) => {
  return (
    <CardContainer glow={glow} background={background}>
      {customTitle ? (
        <>
          {customTitle}
          <br />
        </>
      ) : (
        <BigText weight="bolder">{title}</BigText>
      )}
      {customBody ? (
        <>{customBody}</>
      ) : (
        <p>
          <MediumText>{body}</MediumText>
        </p>
      )}
      {customFooter ? (
        <footer>{customFooter}</footer>
      ) : footer ? (
        <>
          <hr />
          <footer>
            <MediumText>{footer}</MediumText>
          </footer>
        </>
      ) : null}
    </CardContainer>
  );
};
