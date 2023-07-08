import styled from "styled-components";
import UI from "../../../constants/UI";

const Text = styled.span<{
  color?: string;
  textType?: "error" | "success" | "warning" | "accent";
  isSent?: boolean;
  size: "small" | "medium" | "big";
  weight?: "normal" | "lighter" | "italic" | "bold" | "bolder" | "bold";
}>`
  font-weight: ${({ weight }) => (weight ? weight : "normal")};
  color: ${({ isSent, color, textType, theme }) => {
    if (color) return color;
    if (textType) return theme.color[textType];
    if (isSent) {
      if (theme.color.primary === UI.themes.dark.color.primary) {
        return UI.themes.light.color.primary;
      }
    }
    return theme.color.primary;
  }};

  ${({ size, theme }) => {
    switch (size) {
      case "small":
        return `font-size: ${theme.fontSizes.xs};`;
      case "medium":
        return `font-size: ${theme.fontSizes.lg};`;
      case "big":
        return `font-size: ${theme.fontSizes.xl};`;
      default:
        return "";
    }
  }};

  @media (min-width: 768px) {
    ${({ size, theme }) => {
      switch (size) {
        case "small":
          return `font-size: ${theme.fontSizes.xs - 1};`;
        case "medium":
          return `font-size: ${theme.fontSizes.lg - 1};`;
        case "big":
          return `font-size: ${theme.fontSizes.xl - 1};`;
        default:
          return "";
      }
    }};
  }
`;

export const SmallText = styled(Text).attrs(
  (props: {
    color?: string;
    textType?: "error" | "success" | "warning" | "accent";
    isSent?: boolean;
    size: "small" | "medium" | "big";
    weight?: "normal" | "lighter" | "italic" | "bold" | "bolder" | "bold";
  }) => ({
    color: props.color,
    textType: props.textType,
    isSent: props.isSent,
    size: props.size,
    weight: props.weight,
  })
)``;

export const MediumText = styled(Text).attrs(
  (props: {
    color?: string;
    textType?: "error" | "success" | "warning" | "accent";
    isSent?: boolean;
    size: "small" | "medium" | "big";
    weight?: "normal" | "lighter" | "italic" | "bold" | "bolder" | "bold";
  }) => ({
    color: props.color,
    textType: props.textType,
    isSent: props.isSent,
    size: props.size,
    weight: props.weight,
  })
)``;

export const BigText = styled(Text).attrs(
  (props: {
    color?: string;
    textType?: "error" | "success" | "warning" | "accent";
    isSent?: boolean;
    size: "small" | "medium" | "big";
    weight?: "normal" | "lighter" | "italic" | "bold" | "bolder" | "bold";
  }) => ({
    color: props.color,
    textType: props.textType,
    isSent: props.isSent,
    size: props.size,
    weight: props.weight,
  })
)``;
