import { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import {
  CheckboxContainer,
  FormContainer,
  Label,
  Option,
  Setting,
} from "./SessionFormElements";
import { useApplicationState } from "../../../containers/Context";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import Icon from "../../UI/Icon";
import { BigText } from "../../UI/Text";
import { UserCircle } from "../../Message/MessageElements";
import { checkboxData } from "./checkboxData";

// @ts-ignore
const SessionForm = ({ theme, setTheme }) => {
  const {
    state: { session, settings },
    dispatch,
  } = useApplicationState();
  const [showSettings, setShowSettings] = useState(true);
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);

  const dispatchUpdate = (value: {
    useHistory?: boolean;
    revealLocation?: boolean;
    useButtons?: boolean;
    aceptMedia?: boolean;
    aceptLinks?: boolean;
  }) => {
    dispatch({ type: "UPDATE_SETTINGS_STATE", payload: value });
  };

  const themeContext = useContext(ThemeContext);

  const [showHelpText, setShowHelpText] = useState<boolean>(false);

  const handleCheck = (event: { target: { checked: any; name: any } }) => {
    if (event.target.name === "changeTheme") {
      setTheme(theme === "light" ? "dark" : "light");
      return;
    }

    if (event.target.name === "helpText") {
      setShowHelpText(!showHelpText);
      return;
    }

    const { checked, name } = event.target;
    dispatchUpdate({
      [name]: checked,
    });
  };

  return (
    <FormContainer>
      <Label>
        {selectedCheckboxIndex !== -1 ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowSettings(true);
              setSelectedCheckboxIndex(-1);
            }}
          >
            <FlexBoxWithSpacing gap={8}>
              <Icon icon="arrow-left" size="2x" />
              <BigText weight="bold">
                {checkboxData[selectedCheckboxIndex].label}
              </BigText>
            </FlexBoxWithSpacing>
          </div>
        ) : (
          <FlexBoxWithSpacing gap={8}>
            <BigText weight="bold">User ID:</BigText>
            <BigText weight="bolder">{session.userId}</BigText>
            <UserCircle
              color={themeContext.userColors[session.userColorIndex]}
            />
          </FlexBoxWithSpacing>
        )}
      </Label>
      {checkboxData.map((checkbox, index) => (
        <CheckboxContainer>
          {selectedCheckboxIndex === index ? (
            <Setting
              theme={theme}
              settings={settings}
              checkbox={checkbox}
              handleCheck={handleCheck}
            />
          ) : (
            <Option
              showSettings={showSettings}
              settings={settings}
              index={index}
              setSelectedCheckboxIndex={setSelectedCheckboxIndex}
              setShowSettings={setShowSettings}
              checkbox={checkbox}
            />
          )}
        </CheckboxContainer>
      ))}
    </FormContainer>
  );
};

export default SessionForm;
