import { SetStateAction, useEffect, useRef, useState } from "react";
import { EmojiButtom, Container } from "./UserAreaElements";
// @ts-ignore
import useDimensions from "react-use-dimensions";
import SelectEmoji from "./EmojiButton";
import MediaUploader from "./MediaUploader";
import AudioRecorder from "./AuidoRecorder";

import { useApplicationState } from "../../containers/Context";
import { SEND_MESSAGE_EVENT } from "../../lib/socketEvents";
import { StyledInputWithButton } from "../UI/Input";
import Icon from "../UI/Icon";
import { FlexBoxWithSpacing } from "../UI/Spacing";

// @ts-ignore
const UserArea = ({ socket }) => {
  const {
    state: {
      session,
      settings,
      uiVariables: { emojiPickerIsVisible },
    },
    dispatch,
  } = useApplicationState();

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit(SEND_MESSAGE_EVENT, {
      message,
      room: session.room,
      userId: session.userId,
      userColor: session.userColor,
      userColorIndex: session.userColorIndex,
      userAlias: session.userAlias,
    });

    dispatch({
      type: "UPDATE_MESSAGING_DATA_STATE",

      payload: {
        sent: {
          text: message,
          isSent: true,
        },
      },
    });

    // @ts-ignore
    inputRef.current.value = "";
    setMessage("");
  };
  const inputRef = useRef(null);

  return (
    <Container key={"Container"}>
      {emojiPickerIsVisible && <SelectEmoji inputRef={inputRef} />}
      <EmojiButtom
        onClick={() => {
          dispatch({
            type: "UPDATE_UI_STATE",
            payload: {
              emojiPickerIsVisible: !emojiPickerIsVisible,
            },
          });
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
          inputPlaceholder={`Message room ${session.room}`}
          handleInputOnChange={(event: {
            target: { value: SetStateAction<string> };
          }) => {
            setMessage(event.target.value);
          }}
          handleInputOnKeyPress={(event: { key: string }) => {
            if (
              !settings.useButtons &&
              event.key === "Enter" &&
              message !== ""
            ) {
              sendMessage();
            }
          }}
        />
      </div>
      {settings.aceptMedia && (
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
