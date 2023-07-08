import { FC } from "react";
import { CheckboxRecord, checkboxData } from "./checkboxData";
import { useSktioStore } from "../../../store/store";
import { signal } from "@preact/signals-react";
import { FormContainer, Label } from "./SessionFormElements";
import SettingsCheckboxes from "../../../containers/SettingsCheckboxes/SettingsCheckboxes";
import UserName from "./UserName";
import SettingName from "./SettingName";
import { UserSettingsState } from "../../../@types/Setting";
const cursorPointerStyle = { cursor: "pointer" };

const SessionForm: FC<{
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}> = ({ theme, setTheme }) => {
  const { sessionState, userSettingsState, setUserSettingsState } =
    useSktioStore((state) => ({
      sessionState: state.sessionState,
      userSettingsState: state.userSettingsState,
      setUserSettingsState: state.setUserSettingsState,
    }));

  const userSettingWithVisibleUI: keyof UserSettingsState | undefined =
    Object.freeze(
      Object.keys(userSettingsState)?.find(
        (key) =>
          userSettingsState[key as keyof UserSettingsState]?.UIVisible === true
      )
    ) as keyof UserSettingsState | undefined;

  const showSettings = signal(true);

  const setShowSettings = (value: boolean) => {
    showSettings.value = value;
  };

  const selectedCheckboxIndex = signal(-1);
  const setCheckboxIndex = (index: number) => {
    selectedCheckboxIndex.value = index;
  };

  const selectedCheckboxLabel: CheckboxRecord["label"] = checkboxData?.find(
    (record) => record.apiName === userSettingWithVisibleUI
  )?.label;

  return (
    <FormContainer>
      <Label>
        {userSettingWithVisibleUI ? (
          <div
            style={cursorPointerStyle}
            onClick={() => {
              if (!userSettingWithVisibleUI || !userSettingsState) return;
              // alert(
              //   JSON.stringify(userSettingsState[userSettingWithVisibleUI])
              // );
              userSettingsState[userSettingWithVisibleUI].UIVisible = false;

              setUserSettingsState(userSettingsState);
            }}
          >
            <SettingName selectedCheckboxLabel={selectedCheckboxLabel} />
          </div>
        ) : (
          <UserName
            userId={sessionState.userId}
            userColorIndex={sessionState.userColorIndex}
          />
        )}
      </Label>
      <SettingsCheckboxes
        theme={theme}
        setTheme={setTheme}
        selectedCheckboxIndex={selectedCheckboxIndex}
        setCheckboxIndex={setCheckboxIndex}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
    </FormContainer>
  );
};

export default SessionForm;
