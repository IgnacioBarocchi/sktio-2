import { FC, useState } from "react";
import {
  CheckboxContainer,
  SettingOption,
  SettingToggle,
} from "../../components/Aside/SessionForm/SessionFormElements";
import { checkboxData } from "../../components/Aside/SessionForm/checkboxData";
import { useSktioStore } from "../../store/store";
import { SktioStoreState } from "../../@types/Store";
import { Signal } from "@preact/signals-react";

const SettingsCheckboxes: FC<{
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
  selectedCheckboxIndex: Signal<number>;
  setCheckboxIndex: (value: number) => void;
  showSettings: Signal<boolean>;
  setShowSettings: (value: boolean) => void;
}> = ({
  theme,
  setTheme,
  selectedCheckboxIndex,
  setCheckboxIndex,
  showSettings,
  setShowSettings,
}) => {
  const { sessionState, setSessionState, userSettingsState } = useSktioStore(
    (state: SktioStoreState) => ({
      sessionState: state.sessionState,
      setSessionState: state.setSessionState,
      userSettingsState: state.userSettingsState,
    })
  );

  const updateSessionState = (value: {
    useHistory?: boolean;
    revealLocation?: boolean;
    useButtons?: boolean;
    aceptMedia?: boolean;
    aceptLinks?: boolean;
  }) => {
    setSessionState({ ...sessionState, ...value });
  };

  // todo pasar a signal
  const [showHelpText, setShowHelpText] = useState<boolean>(false);

  const handleCheck = (event: {
    target: { checked: boolean; name: string };
  }) => {
    if (event.target.name === "changeTheme") {
      alert("si");
      setTheme(theme === "light" ? "dark" : "light");
      return;
    }

    if (event.target.name === "helpText") {
      setShowHelpText(!showHelpText);
      return;
    }

    const { checked, name } = event.target;
    updateSessionState({
      [name]: checked,
    });
  };

  return (
    <>
      {checkboxData.map((checkbox, index) => (
        <CheckboxContainer>
          {selectedCheckboxIndex.value === index ? (
            <SettingToggle
              theme={theme}
              settings={userSettingsState}
              checkbox={checkbox}
              handleCheck={handleCheck}
            />
          ) : (
            <SettingOption
              showSettings={showSettings}
              setShowSettings={setShowSettings}
              settings={userSettingsState}
              index={index}
              setCheckboxIndex={setCheckboxIndex}
              checkbox={checkbox}
            />
          )}
        </CheckboxContainer>
      ))}
    </>
  );
};

export default SettingsCheckboxes;
