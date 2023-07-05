import { useState } from "react";
// @ts-ignore
import { useApplicationState } from "../../../containers/Context";
import { SEND_MESSAGE_EVENT } from "../../../lib/socketEvents";

import { MediaType } from "../../../@types/Message/Message";
import { Socket } from "socket.io-client";
import Icon from "../../UI/Icon";
import SoundVisualizer from "./AudiRecorderElements";
import { FlexBoxWithSpacing } from "../../UI/Spacing";

const AudioRecorder = ({ socket }: { socket: Socket }) => {
  const {
    state: { session },
    dispatch,
  } = useApplicationState();
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob: any) => {
    // console.log("chunk of real-time data is: ", recordedBlob);
  };

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
              text: "",
              media,
              isSent: true,
            },
          },
        });
      }
    };
  };

  return (
    <FlexBoxWithSpacing gap={8}>
      {!isRecording ? (
        <Icon icon={"microphone"} onClick={startRecording} size={"2x"} />
      ) : (
        <Icon size={"2x"} icon={"microphone-slash"} onClick={stopRecording} />
      )}

      <SoundVisualizer
        onStop={onStop}
        onData={onData}
        isRecording={isRecording}
      />
    </FlexBoxWithSpacing>
  );
};

export default AudioRecorder;
