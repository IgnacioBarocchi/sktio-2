import { type } from "os";
import { MediaType } from "./WebSocketPayloads";
const Emitters = {
  OWNER: "OWNER",
  OTHER: "OTHER",
  SYSTEM: "SYSTEM",
} as const;

type Emitter = keyof typeof Emitters;

interface TextMessage {
  read?: boolean;
  text: string;
}

interface MediaMessage {
  media?: MediaType;
}

export interface Message extends TextMessage, MediaMessage {
  isSent: boolean;
  fromUserId: string;
  fromUserColorIndex: number;
  fromUserAlias?: string;
  userColorIndex?: number;
  fromSystem?: boolean;
}

export type MessagesState = Message[];
//{
//   sent: Message[];
//   recieved: Message[];
//   system: Message[];
// }

export interface MessageFromSocketPayload {
  emitter: Emitter;
}

// todo organizar el obj message para que sea un obj y no un array
// export interface MessagesState {
//   sent: Message[];
//   recieved: Message[];
//   currentSystemMessage: Message;
// }
// {
//   sent: [],
//   recieved: [],
//   system: [],
// },
