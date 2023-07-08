import { FC, SetStateAction, useRef } from "react";
import { EmojiButtom, Container } from "./UserAreaElements";
// @ts-ignore
import useDimensions from "react-use-dimensions";
// todo emoji button
// import SelectEmoji from "./EmojiButton";
import MediaUploader from "./MediaUploader";
import AudioRecorder from "./AuidoRecorder";

import { SEND_MESSAGE_EVENT } from "../../lib/socketEvents";
import { StyledInputWithButton } from "../UI/Input";
import Icon from "../UI/Icon";
import { FlexBoxWithSpacing } from "../UI/Spacing";
import { useSktioStore } from "../../store/store";
import { signal } from "@preact/signals-react";
import { Socket } from "socket.io-client";

const UserArea: FC<{ socket: Socket }> = ({ socket }) => {
  const message = signal("");

  const { messagesState, setMessagesState, userSettingsState, sessionState } =
    useSktioStore((state) => ({
      userSettingsState: state.userSettingsState,
      UIState: state.UIState,
      sessionState: state.sessionState,
      messagesState: state.messagesState,
      setMessagesState: state.setMessagesState,
    }));

  const sendMessage = () => {
    socket.emit(SEND_MESSAGE_EVENT, {
      message: message.value,
      room: sessionState.room,
      userId: sessionState.userId,
      // userColor: sessionState.userColor,
      userColorIndex: sessionState.userColorIndex,
      userAlias: sessionState.userAlias,
    });

    // UPDATE_MESSAGING_DATA_STATE
    const payload = { text: message.value, isSent: true };
    console.log(messagesState);
    messagesState.push(payload);
    setMessagesState(messagesState);

    // @ts-ignore
    inputRef.current.value = "";
    message.value = "";
  };
  const inputRef = useRef(null);

  return (
    <Container key={"Container"}>
      {/* {emojiPickerIsVisible && <SelectEmoji inputRef={inputRef} />} */}
      <EmojiButtom
        onClick={() => {
          // todo make emoji visible
        }}
      >
        <Icon icon="face-smile" size={"2x"} />
      </EmojiButtom>
      <div
        style={{
          gridArea: "input-message-area",
          width: "100%",
        }}
      >
        <StyledInputWithButton
          wide
          buttons={[{ onClick: sendMessage, icon: "paper-plane" }]}
          key={"MessageInput"}
          inputRef={inputRef}
          // inputPlaceholder={`Message room ${session.room}`}
          inputPlaceholder={`Message room ${sessionState.room}`}
          handleInputOnChange={(event: {
            target: { value: SetStateAction<string> };
          }) => {
            message.value = event.target.value;
          }}
          handleInputOnKeyPress={(event: { key: string }) => {
            if (event.key === "Enter" && message.value !== "") {
              sendMessage();
            }
          }}
        />
      </div>
      {/* {settings.aceptMedia && ( */}
      {userSettingsState.aceptMedia.value && (
        <div
          style={{
            gridArea: "input-media-area",
            width: "-webkit-fill-available%",
          }}
        >
          <FlexBoxWithSpacing gap={"space-around"}>
            <MediaUploader socket={socket} />
            <AudioRecorder socket={socket} />
            <Icon size="2x" icon="circle-plus" />
          </FlexBoxWithSpacing>
        </div>
      )}
    </Container>
  );
};

export default UserArea;
/*&& emojiRegexExp.test(message)*/
