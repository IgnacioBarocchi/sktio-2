import { FC } from "react";
import Icon from "../../UI/Icon";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { BigText } from "../../UI/Text";
import { CheckboxRecord } from "./checkboxData";

const SettingName: FC<{
  selectedCheckboxLabel: CheckboxRecord["label"];
}> = ({ selectedCheckboxLabel }) => {
  return (
    <FlexBoxWithSpacing gap={8}>
      <Icon icon="arrow-left" size="2x" />
      {/* @ts-ignore */}
      <BigText weight="bold">{selectedCheckboxLabel}</BigText>
    </FlexBoxWithSpacing>
  );
};

export default SettingName;
// const { setUserSettingsState } = useSktioStore((state) => ({
//   setUserSettingsState: state.setUserSettingsState,
// }));
// console.log(curretSetting);
//
//
//
