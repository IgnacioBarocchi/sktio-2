import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { StyledInput } from "../../UI/Input";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { MediumText, SmallText } from "../../UI/Text";
import Toggle from "../../UI/Toggle";
import Icon from "../../UI/Icon";

export const FormContainer = styled.div`
  padding: 16px;
`;

export const Input = styled(StyledInput)`
  margin-bottom: 16px;
  max-width: 400px;
`;

export const Label = styled(MediumText).attrs({ as: "label" })`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CheckboxLabel = styled(MediumText).attrs({ as: "label" })`
  margin-left: 8px;
`;

export const HelpText = styled(SmallText)`
  color: ${({ theme }) => theme.color.accent};
`;

const SettingContainer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;
// @ts-ignore
export const Setting = ({ theme, settings, checkbox, handleCheck }) => {
  return (
    <SettingContainer>
      <div>
        <MediumText weight="bolder">{checkbox.headerText}</MediumText>
      </div>

      <Toggle
        gap={"space-between"}
        defaultChecked={settings[checkbox.name]}
        name={checkbox.name}
        label={
          checkbox.name !== "changeTheme"
            ? checkbox.label
            : `change to ${theme === "light" ? "dark" : "light"}`
        }
        onChange={handleCheck}
      />

      <HelpText weight="bold">{checkbox.helpText}</HelpText>
    </SettingContainer>
  );
};

const OptionContainer = styled.div<{ showSettings: boolean }>`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: ${({ showSettings }) => (showSettings ? "flex" : "none")};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.color.lowContrast};
`;

export const Option = ({
  showSettings,
  settings,
  index,
  setSelectedCheckboxIndex,
  setShowSettings,
  checkbox,
}: {
  showSettings: boolean;
  settings: any[];
  index: number;
  setSelectedCheckboxIndex: Dispatch<SetStateAction<number>>;
  setShowSettings: any;
  checkbox: any;
}) => {
  return (
    <OptionContainer
      showSettings={showSettings}
      onClick={() => {
        // @ts-ignore
        setSelectedCheckboxIndex(index);
        setShowSettings(false);
      }}
    >
      <MediumText weight="bold">{checkbox.label}</MediumText>
      <FlexBoxWithSpacing gap={8}>
        <MediumText weight="bold">
          {settings[checkbox.name] ? "On" : "Off"}
        </MediumText>
        <Icon icon="arrow-right" /*color="red"*/ />
      </FlexBoxWithSpacing>
    </OptionContainer>
  );
};
