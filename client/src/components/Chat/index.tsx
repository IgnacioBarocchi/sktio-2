import { RefObject, useContext, useRef } from "react";
import { useApplicationState } from "../../containers/Context";
import { Messages, ObservedToScrollContainer } from "./ChatElements";
import { Socket } from "socket.io-client";
import useOnScreen from "../../containers/useOnScreen";
import Message from "../Message";
import { getMessageMetadata } from "./MessagesHelper";
import UserArea from "../UserArea";
import { MessageOPTProps } from "../../@types/Message/Message";
import { ThemeContext } from "styled-components";

interface Message extends MessageOPTProps {
  fromUserColor: string;
  fromUserId: string;
  text: string | undefined;
  isSent: boolean;
  fromSystem?: boolean;
  fromUserAlias: string;
}

const Chat = ({ socket }: { socket: Socket }) => {
  const themeContext = useContext(ThemeContext);

  const {
    state: { session, settings, messages, uiVariables },
  } = useApplicationState();

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
      session,
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
      <Messages isSmallDevice={uiVariables.isSmallDevice}>
        {settings.useHistory && messages && messages.map(mapMessages)}
      </Messages>
      {session.room && <UserArea socket={socket} />}
    </>
  );
};

export default Chat;
