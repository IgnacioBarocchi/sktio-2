import { useEffect } from "react";
import {
  AudioMessage,
  ImageMessage,
  SystemMessage,
  TextMessage,
} from "./Bubbles";
import { playSoundWithDelay } from "./helper";
import { MessageContainer } from "./MessageElements";
import notificationSound from "../../assets/sounds/notification.mp3";
import systemMessageSound from "../../assets/sounds/system.mp3";
// @ts-ignore

const Message = ({
  ref,
  color,
  id,
  message,
  isSent,
  fromSystem,
  media,
}: MessagePropsWithRef) => {
  useEffect(() => {
    if (!isSent) playSoundWithDelay(notificationSound, 200);
    if (fromSystem) playSoundWithDelay(systemMessageSound, 2000);
  }, []);

  if (fromSystem) {
    alert("System!");
    return <SystemMessage color={color} id={id} message={message} />;
  }

  if (!media)
    return (
      <MessageContainer isSent={isSent} color={color} ref={ref}>
        <TextMessage
          isSent={isSent}
          color={color}
          id={id}
          message={message as string}
        />
      </MessageContainer>
    );

  const MediaSwitcher = () =>
    ({
      image: (): JSX.Element => (
        <ImageMessage username={id as string} src={media.src} isSent={isSent} />
      ),
      audio: (): JSX.Element => (
        <AudioMessage
          isSent={isSent as boolean}
          src={media.src}
          localURL={isSent && !fromSystem ? media?.localURL : undefined}
        />
      ),
    } as { [key: string]: () => JSX.Element });

  return (
    <MessageContainer isSent={isSent} color={color} ref={ref}>
      {MediaSwitcher()[media.type as keyof typeof media]() as JSX.Element}
    </MessageContainer>
  );
};

export default Message;

type MediaType = { type: "image" | "audio"; src: string; localURL?: string };

interface MessageProps {
  color: string;
  id: string | null;
  message?: string;
  isSent?: boolean;
  fromSystem?: boolean;
  media?: MediaType;
}

interface MessagePropsWithRef extends MessageProps {
  ref?: any;
}
