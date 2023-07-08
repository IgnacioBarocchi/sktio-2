import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { StyledInput } from "../../UI/Input";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { MediumText, SmallText } from "../../UI/Text";
import Toggle from "../../UI/Toggle";
import Icon from "../../UI/Icon";
import { UserSettingsState } from "../../../@types/Setting";
import { Signal } from "@preact/signals-react";
import { CheckboxRecord } from "./checkboxData";

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

const OptionContainer = styled.div<{ showSettings: boolean }>`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: ${({ showSettings }) => (showSettings ? "flex" : "none")};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.color.lowContrast};
`;

export const SettingOption: FC<{
  settings: UserSettingsState;
  showSettings: Signal<boolean>;
  setShowSettings: (value: boolean) => void;
  index: number;
  setCheckboxIndex: (value: number) => void;
  checkbox: CheckboxRecord;
}> = ({
  settings,
  showSettings,
  setShowSettings,
  index,
  setCheckboxIndex,
  checkbox,
}) => {
  const optionState = settings[checkbox?.apiName as keyof UserSettingsState]
    ? "On"
    : "Off";

  return (
    <OptionContainer
      showSettings={showSettings.value}
      onClick={() => {
        alert("click");
        // @ts-ignore
        setCheckboxIndex(index);
        setShowSettings(false);
      }}
    >
      {/* @ts-ignore */}
      <MediumText weight="bold">{checkbox.label}</MediumText>
      <FlexBoxWithSpacing gap={8}>
        {/* @ts-ignore */}
        <MediumText weight="bold">{optionState}</MediumText>
        <Icon icon="arrow-right" /*color="red"*/ />
      </FlexBoxWithSpacing>
    </OptionContainer>
  );
};

const SettingContainer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

export const UpdateSettingToggle: FC<{
  theme: "light" | "dark";
  settings: UserSettingsState;
  checkbox: CheckboxRecord;
  handleCheck: (event: { target: { checked: boolean; name: string } }) => void;
}> = ({ theme, settings, checkbox, handleCheck }) => {
  console.log(`Setting`);
  return (
    <SettingContainer>
      <div>
        {/* @ts-ignore */}
        <MediumText weight="bolder">{checkbox.headerText}</MediumText>
      </div>

      <Toggle
        gap={"space-between"}
        // @ts-ignore
        defaultChecked={settings[checkbox.name]}
        name={checkbox.name}
        label={
          checkbox.name !== "changeTheme"
            ? checkbox.label
            : `change to ${theme === "light" ? "dark" : "light"}`
        }
        onChange={handleCheck}
      />
      {/* @ts-ignore */}
      <HelpText weight="bold">{checkbox.helpText}</HelpText>
    </SettingContainer>
  );
};
