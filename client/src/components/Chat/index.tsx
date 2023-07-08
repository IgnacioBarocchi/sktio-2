import { FC, RefObject, useContext, useRef } from "react";
import { Messages, ObservedToScrollContainer } from "./ChatElements";
import { Socket } from "socket.io-client";
import useOnScreen from "../../containers/useOnScreen";
import Message from "../Message";
import { getMessageMetadata } from "./MessagesHelper";
import UserArea from "../UserArea";
import { ThemeContext } from "styled-components";
import { useSktioStore } from "../../store/store";

const Chat: FC<{ socket: Socket }> = ({ socket }) => {
  const themeContext = useContext(ThemeContext);

  const { sessionState, userSettingsState, messagesState } = useSktioStore(
    (state) => ({
      sessionState: state.sessionState,
      userSettingsState: state.userSettingsState,
      messagesState: state.messagesState,
    })
  );

  console.log(messagesState);

  const scrollRef = useRef(null);

  const [isVisible, observe] = useOnScreen();

  const scrollToLastMessage = () => {
    if (!isVisible) {
      // @ts-ignore
      scrollRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const mapMessages = (
    singleMessage: Message,
    i: number,
    messages: Message[]
  ) => {
    const { username, color } = getMessageMetadata(
      singleMessage,
      i,
      messages,
      sessionState,
      themeContext
    );
    const { isSent, text, fromSystem, media } = singleMessage;
    scrollToLastMessage();

    return (
      <ObservedToScrollContainer
        key={`MessageBox-${i}`}
        scrollRef={scrollRef}
        observe={
          observe as unknown as (
            element: any
          ) => boolean | void | RefObject<HTMLDivElement>
        }
      >
        <Message
          color={color}
          id={username}
          message={text}
          media={media}
          isSent={isSent}
          fromSystem={fromSystem}
        />
      </ObservedToScrollContainer>
    );
  };

  return (
    <>
      <Messages isSmallDevice={false}>
        {userSettingsState.useHistory &&
          messagesState.length > 0 &&
          messagesState.map(mapMessages)}
      </Messages>
      {sessionState.room && <UserArea socket={socket} />}
    </>
  );
};

export default Chat;
