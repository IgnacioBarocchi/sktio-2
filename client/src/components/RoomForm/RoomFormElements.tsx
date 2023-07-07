import { useRef, useState } from "react";
import styled from "styled-components";
// import { useApplicationState } from "../../containers/Context";
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  // background-color: blue;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const TokenChunkInput = styled.input`
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 5px;
  width: 20%;
  text-align: center;
  background: transparent;
  margin-left: 2.5px;
  margin-right: 2.5px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl} !important;
  font-weight: 800;
  outline: none;
  border-radius: 0;
  user-select: none;
  ::selection {
    background: ${({ theme }) => theme.background.primary};
  }
`;

export const CheckboxField = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  margin-left: 5px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-top: 5px;
`;

export const Option = styled.option``;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.background.tertiary};
  color: white;
  margin-top: 20px;
  cursor: pointer;
`;

export const InputContainer = styled.div<{ isSmallDevice: boolean }>`
  display: flex;

  flex-wrap: wrap;

  padding-left: 2.5px;
  padding-right: 2.5px;
  // background-color: red;

  justify-content: center;
`;

type TokenInputProps = {
  name: string;
  val: string;
  onChange: (values: string[]) => void;
};

export const TokenInput = ({ name, val, onChange }: TokenInputProps) => {
  // const {
  //   state: { uiVariables },
  // } = useApplicationState();
  const [inputValues, setInputValues] = useState<string[]>(val.split(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event?.target?.name);
    const inputValue = event?.target?.value.slice(0, 1);
    console.log(parseInt(inputValue));

    if (!parseInt(inputValue)) return;
    const newInputValues = [...inputValues];
    newInputValues[index] = inputValue;
    setInputValues(newInputValues);
    // @ts-ignore
    // inputValue !== "" ||
    if (inputValue !== "") {
      if (index < inputRefs.current.length - 1) {
        inputRefs?.current[index + 1]?.focus();
        inputRefs?.current[index + 1]?.select();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    onChange(inputValues);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const index = parseInt(event.currentTarget.name);
    if (event.key === "Backspace" && inputValues[index] === "") {
      event.preventDefault();
      inputRefs.current[index - 1].focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (event.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    // <InputContainer isSmallDevice={uiVariables.isSmallDevice}>
    <InputContainer isSmallDevice={false}>
      {inputValues.map((inputValue, index) => (
        <TokenChunkInput
          key={index}
          type="text"
          name={`${index}`}
          value={inputValue ? inputValue : undefined}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={(el: HTMLInputElement) => inputRefs.current.push(el!)}
          onClick={() => inputRefs.current[index].select()}
        />
      ))}
    </InputContainer>
  );
};
