import { KeyboardEventHandler, useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { useApplicationState } from "../../containers/Context";
import { Card } from "../UI/Card";
import { StyledInputWithButton } from "../UI/Input";
import { FlexBoxWithSpacing } from "../UI/Spacing";
import { BigText, MediumText } from "../UI/Text";
import {
  AliasContainer,
  Content,
  DeployYourOwn,
  GoOnline,
  SampleConversation,
} from "./LandingElements";
import { useSktioStore } from "../../store/store";

const LandingForm = ({ isSmallDevice }: { isSmallDevice: boolean }) => {
  const [aliasConfirmed, setAliasConfirmed] = useState<boolean>(false);

  const [alias, setAlias] = useState<string>("");
  const { sessionState, setSessionState } = useSktioStore((state) => ({
    sessionState: state.sessionState,
    setSessionState: state.setSessionState,
  }));
  // const {
  //   state: { session },
  //   dispatch,
  // } = useApplicationState();

  const themeContext = useContext(ThemeContext);

  const handleConfirmAlias = (
    event:
      | React.KeyboardEventHandler<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEventHandler<HTMLInputElement>
  ) => {
    // @ts-ignore
    event.preventDefault();
    // dispatch({ type: "SET_USER_SESSION", payload: { userAlias: alias } });
    sessionState.userAlias = alias;
    setSessionState(sessionState);
    setAliasConfirmed(true);
  };

  const handleAliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAlias(event.target.value);
  };

  return (
    <Content isSmallDevice={isSmallDevice}>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Card
          title="What is Skt.io?"
          body="Skt.io offers end-to-end encryption, is free to use, and does not
          display ads or require login information. With Skt.io, you can chat
          anonymously without worrying about your conversations being tracked or
          your data being collected. Whether you want to catch up with friends,
          family, or meet new people, Skt.io is a secure and straightforward
          messaging platform for you to try."
          background="secondary"
        ></Card>
        <Card
          title="Get started"
          background="secondary"
          customBody={<SampleConversation />}
          customFooter={
            <>
              <BigText weight="bold">Don't any create account</BigText>
              <br />
              <br />
              {aliasConfirmed ? (
                <AliasContainer>
                  <BigText
                    style={{ marginBottom: "8px", marginRight: ".5rem " }}
                  >
                    Your alias is
                  </BigText>
                  <BigText
                    color={themeContext.userColors[sessionState.userColorIndex]}
                    // color={themeContext.userColors[session.userColorIndex]}
                  >
                    {aliasConfirmed ? alias : ""}
                  </BigText>
                </AliasContainer>
              ) : (
                <>
                  <FlexBoxWithSpacing gap={8}>
                    <StyledInputWithButton
                      value={alias}
                      handleInputOnKeyPress={(event) => {
                        if (event && event.key === "Enter") {
                          handleConfirmAlias(
                            // @ts-ignore
                            event
                          );
                        }
                      }}
                      inputPlaceholder={"Write your alias"}
                      handleInputOnChange={handleAliasChange}
                      buttons={[
                        {
                          onClick: handleConfirmAlias,
                          icon: "arrow-turn-down",
                        },
                      ]}
                      maxTextLength={25}
                    />
                    <MediumText weight="bold" textType="warning">
                      Leaving the field blank will display your user ID.
                    </MediumText>
                  </FlexBoxWithSpacing>
                </>
              )}
            </>
          }
        ></Card>
        <Card
          title="Check the repo"
          background="secondary"
          customBody={
            <>
              <br />
              <br />
              <MediumText textType="success">
                <a href="https://github.com/IgnacioBarocchi/Sktio">
                  [GH logo] Skt.io
                </a>
              </MediumText>
            </>
          }
        ></Card>
      </div>
      <div style={{ width: "50%" }}>
        <div>
          <GoOnline />
        </div>
        <div>
          <DeployYourOwn />
        </div>
      </div>
    </Content>
  );
};
export default LandingForm;
