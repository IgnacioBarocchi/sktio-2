import { RefObject, useContext, useRef } from "react";
import useOnScreen from "../useOnScreen";
import { MessageOPTProps } from "../../@types/WebSocketPayloads";
import { For } from "million/react";
import { getMessageMetadata } from "./helper/conversationHelper";
import {
  Messages,
  ObservedToScrollContainer,
} from "../../components/Chat/ChatElements";
import Message from "../../components/Message";
import { ThemeContext } from "styled-components";
import { useSktioStore } from "../../store/store";
import type { Message as MessageType } from "../../@types/Message";

const Conversation = () => {
  const { sessionState, userSettingsState, messagesState } = useSktioStore(
    (state) => ({
      sessionState: state.sessionState,
      userSettingsState: state.userSettingsState,
      messagesState: state.messagesState,
    })
  );

  const themeContext = useContext(ThemeContext);
  console.log(JSON.stringify(themeContext));
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

  const messages: MessageType[] = [].concat(...Object.values(messagesState));

  return (
    <Messages isSmallDevice={false}>
      {userSettingsState.useHistory && messagesState && (
        <For each={messages}>
          {(singleMessage: MessageType, i: number) => {
            const { username, color } = getMessageMetadata(
              singleMessage,
              i,
              messages,
              sessionState,
              themeContext
            );
            scrollToLastMessage();

            // todo review from system
            const { isSent, text, fromSystem, media } = singleMessage;
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
          }}
        </For>
      )}
    </Messages>
  );
};

export default Conversation;

interface Message extends MessageOPTProps {
  fromUserColor: string;
  fromUserId: string;
  text: string | undefined;
  isSent: boolean;
  fromSystem?: boolean;
  fromUserAlias: string;
}
