import styled, { css } from "styled-components";
import UI from "../../constants/UI";
import { Messages } from "../Chat/ChatElements";
import { Bubble } from "../Message/Bubbles";
import { StyledBackgroundRounded } from "../UI/Background";
import CodeCard from "../UI/CodeCard";
import { FlexBoxWithSpacing } from "../UI/Spacing";
import { MediumText, SmallText } from "../UI/Text";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96vh;
  width: 100%;
  margin-top: 4vh;
`;

export const Title = styled.h1`
  font-size: 10vh;
  margin: 1rem;
  color: ${({ theme }) => theme.color.primary};
  margin-left: 0;
  margin-right: 0;
  font-weight: black;
`;

export const CircleButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.secondary};
  border: 1px solid ${({ theme }) => theme.color.tertiary};
`;

export const LandingFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${UI.dimensions.map.get("nav-height") + "vh"};
  width: 100%;
`;

export const Content = styled(StyledBackgroundRounded).attrs(
  (props: { isSmallDevice?: boolean }) => ({
    isSmallDevice: props.isSmallDevice,
  })
)`
  height: 100%;
  ${({ isSmallDevice }) =>
    isSmallDevice
      ? ""
      : `
      border: 1px solid ${({ theme }: { theme: any }) => theme.color.primary};
    `};

  background: ${({ theme }) => theme.background.primary};
  display: flex;
`;

export const AliasContainer = styled.div`
  display: flex;
`;

const SampleMessages = styled(Messages)`
  height: 30vh;
`;
export const SampleConversation = (): JSX.Element => {
  return (
    <div style={{ position: "relative" }}>
      <Gradient isTop={true}></Gradient>
      <SampleMessages>
        <Bubble
          isLeft={false}
          message={
            "Hello everyone! Just a quick note to let you know that if you choose to use an alias in this chat room, it will only be visible during your current session."
          }
          messageType="text"
          renderTail
        >
          Hello everyone! Just a quick note to let you know that if you choose
          to use an alias in this chat room, it will only be visible during your
          current session.
        </Bubble>
        <Bubble
          isLeft={true}
          message={
            "Once you leave the room, your alias will be cleaned and will not be stored for future sessions."
          }
          messageType="text"
          renderTail
        >
          Once you leave the room, your alias will be cleaned and will not be
          stored for future sessions.
        </Bubble>
        <Bubble
          isLeft={false}
          message={
            "Please keep in mind that using an alias is optional - if you leave the field blank, your user ID will be displayed instead."
          }
          messageType="text"
          renderTail
        >
          Please keep in mind that using an alias is optional - if you leave the
          field blank, your user ID will be displayed instead.
        </Bubble>
        <Bubble
          isLeft={true}
          message={"Happy chatting!"}
          messageType="text"
          renderTail
        >
          Happy chatting!
        </Bubble>
      </SampleMessages>
      <Gradient isTop={false}></Gradient>
    </div>
  );
};
//

const Li = styled.li`
  margin-bottom: 1rem;
`;

export const DeployYourOwn = () => {
  return (
    <>
      <Title>Deploy your own.</Title>
      <ol>
        <Li>
          <MediumText>* Download the code</MediumText>
          <CodeCard
            code={"git clone https://github.com/IgnacioBarocchi/Sktio"}
          />
        </Li>
        <Li>
          <MediumText>* Run a development (or production) server</MediumText>
          <CodeCard code={"cd ./server && npm install && npm run dev"} />
        </Li>
        <Li>
          <MediumText>* Start the react client</MediumText>
          <CodeCard code={"cd ./client && npm install && npm start"} />
        </Li>
        <Li>
          <FlexBoxWithSpacing gap={8}>
            <MediumText>
              Find more information in at
              <FlexBoxWithSpacing gap={8}>
                <MediumText textType="success">
                  <a href="https://github.com/IgnacioBarocchi/Sktio">
                    https://github.com/IgnacioBarocchi/Sktio
                  </a>
                </MediumText>
              </FlexBoxWithSpacing>
            </MediumText>
          </FlexBoxWithSpacing>
        </Li>
      </ol>
    </>
  );
};
// background: ${({ theme, isTop }) =>
// `linear-gradient(0deg, ${
//   isTop ? theme.background.secondary : "transparent"
// },${isTop ? "transparent" : theme.background.secondary} )`};
export const Gradient = styled.span<{ isTop: boolean }>`
  background: ${({ theme, isTop }) =>
    `linear-gradient(0deg, ${
      isTop ? "transparent" : theme.background.secondary
    }, transparent)`};
  height: 50px;
  width: -webkit-fill-available;
  position: absolute;
  bottom: ${({ isTop }) => !isTop && 0};
  top: ${({ isTop }) => isTop && 0};
`;

export const GoOnline = () => {
  return (
    <>
      <Title>Go online.</Title>
      <ol>
        <Li>
          <MediumText>
            Welcome to Skt.io - where chatting is effortless, without the hassle
            of accounts, ads, or algorithms.
          </MediumText>
        </Li>
        <Li>
          <MediumText>
            Stay connected with your friends, team, or family, no matter where
            you are. Skt.io offers the simplest way to chat without any
            distractions, so you can focus on the conversation.
          </MediumText>
        </Li>
        <Li>
          <MediumText>
            Say goodbye to the frustration of complicated sign-up processes and
            invasive ads. Do not download any app now and start chatting with
            ease!
          </MediumText>
        </Li>
      </ol>
    </>
  );
};
