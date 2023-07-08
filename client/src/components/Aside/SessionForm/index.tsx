import { useContext } from "react";
import { ThemeContext } from "styled-components";
import Icon from "../../UI/Icon";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { BigText } from "../../UI/Text";
import { UserCircle } from "../../Message/MessageElements";
import { checkboxData } from "./checkboxData";
import { useSktioStore } from "../../../store/store";
import { signal } from "@preact/signals-react";
import { FormContainer, Label } from "./SessionFormElements";
import SettingsCheckboxes from "../../../containers/SettingsCheckboxes/SettingsCheckboxes";

// @ts-ignore
const SessionForm = ({ theme, setTheme }) => {
  const themeContext = useContext(ThemeContext);

  const { sessionState } = useSktioStore((state) => ({
    sessionState: state.sessionState,
  }));

  const showSettings = signal(true);

  const setShowSettings = (value: boolean) => {
    showSettings.value = value;
  };

  const selectedCheckboxIndex = signal(-1);
  const setCheckboxIndex = (index: number) => {
    selectedCheckboxIndex.value = index;
  };

  return (
    <FormContainer>
      <Label>
        {selectedCheckboxIndex.value !== -1 ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowSettings(true);
              setCheckboxIndex(-1);
            }}
          >
            <FlexBoxWithSpacing gap={8}>
              <Icon icon="arrow-left" size="2x" />
              <BigText weight="bold">
                {checkboxData[selectedCheckboxIndex.value].label}
              </BigText>
            </FlexBoxWithSpacing>
          </div>
        ) : (
          <FlexBoxWithSpacing gap={8}>
            <BigText weight="bold">User ID:</BigText>
            <BigText weight="bolder">{sessionState.userId}</BigText>
            <UserCircle
              color={themeContext?.userColors[sessionState.userColorIndex]}
            />
          </FlexBoxWithSpacing>
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
