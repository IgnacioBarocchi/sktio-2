import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  MouseEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  RefObject,
} from "react";
import styled from "styled-components";
import { FlexBoxWithSpacing } from "../Spacing";

export const StyledInput = styled.input.attrs({
  autoComplete: "off",
})`
  background: ${({ theme }) => theme.background.primary};
  padding: 10px;
  color: ${({ theme }) => theme.color.primary};
  font-size: 16px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.color.lowContrast};
  outline: none;
  border-radius: 8px;
  margin-right: 10px;
  cursor: auto;
  pointer-events: all;
  transition: all 0.3s ease-in-out;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.color.lowContrast};
    font-weight: 200;
    font-style: italic;
  }

  &:hover {
    background-color: ${({ theme }) => theme.background.lowContrast};
    border: 1px solid ${({ theme }) => theme.color.tertiary};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.secondary};
  }
`;

export const InputWrapper = styled.div<{ wide?: boolean }>`
  position: relative;
  width: 255px;
  ${({ wide }) => {
    if (wide) {
      return "width: -webkit-fill-available";
    }
  }};
`;

export const InputButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: grey;
  cursor: pointer;
  font-size: 30px;
  font-weight: 700;
  margin-right: 8px;
`;

export const StyledInputWithButton = ({
  handleInputOnChange,
  handleInputOnKeyPress,
  buttons,
  inputPlaceholder,
  value,
  inputRef,
  wide = false,
  maxTextLength = undefined,
}: {
  handleInputOnChange?: ChangeEventHandler<HTMLInputElement>;
  handleInputOnKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  buttons: WrappedButton[];
  inputPlaceholder?: string;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  wide?: boolean;
  maxTextLength?: number;
}) => {
  return (
    <InputWrapper wide={wide}>
      <StyledInput
        ref={inputRef}
        value={value}
        placeholder={inputPlaceholder}
        onChange={handleInputOnChange}
        onKeyPress={handleInputOnKeyPress}
        maxLength={maxTextLength}
      />
      <FlexBoxWithSpacing gap={10}>
        {buttons.map((button, i) => {
          return (
            <InputButton onClick={button.onClick} key={i}>
              <FontAwesomeIcon
                icon={button.icon as IconProp}
                style={{
                  transform: `${
                    button.icon === "arrow-turn-down" ? "rotate(90deg)" : "none"
                  }`,
                }}
              />
            </InputButton>
          );
        })}
      </FlexBoxWithSpacing>
    </InputWrapper>
  );
};

interface WrappedButton {
  icon?: FontAwesomeIconProps["icon"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
}
