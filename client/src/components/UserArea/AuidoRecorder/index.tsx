import { useState } from "react";
// @ts-ignore
import { useApplicationState } from "../../../containers/Context";
import { SEND_MESSAGE_EVENT } from "../../../lib/socketEvents";

import { Socket } from "socket.io-client";
import Icon from "../../UI/Icon";
import SoundVisualizer from "./AudiRecorderElements";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { useSktioStore } from "../../../store/store";
import { MediaType } from "../../../@types/WebSocketPayloads";
import { signal } from "@preact/signals-react";

const AudioRecorder = ({ socket }: { socket: Socket }) => {
  // const {
  //   state: { session },
  //   dispatch,
  // } = useApplicationState();

  const { sessionState } = useSktioStore((state) => ({
    sessionState: state.sessionState,
  }));
  const isRecording = signal(false);

  const startRecording = () => {
    isRecording.value = true;
  };

  const stopRecording = () => {
    isRecording.value = false;
  };

  // todo dispatch recording event
  // const onData = (recordedBlob: any) => {
  // console.log("chunk of real-time data is: ", recordedBlob);
  // };

  const onStop = (recordedBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(recordedBlob.blob);

    reader.onloadend = () => {
      const base64data = reader.result?.toString().split(",")[1];
      if (base64data) {
        const media: MediaType = {
          type: "audio",
          src: base64data,
          localURL: recordedBlob.blobURL,
        };
        socket.emit(SEND_MESSAGE_EVENT, {
          media,
          room: sessionState.room,
          userId: sessionState.userId,
          userColorIndex: sessionState.userColorIndex,
          userAlias: sessionState.userAlias,
        });
      }
    };
  };

  return (
    <FlexBoxWithSpacing gap={8}>
      {!isRecording.value ? (
        <Icon icon={"microphone"} onClick={startRecording} size={"2x"} />
      ) : (
        <Icon size={"2x"} icon={"microphone-slash"} onClick={stopRecording} />
      )}

      <SoundVisualizer
        onStop={onStop}
        onData={() => {
          console.log("todo dispatch recording event");
        }}
        isRecording={isRecording.value}
      />
    </FlexBoxWithSpacing>
  );
};

export default AudioRecorder;
