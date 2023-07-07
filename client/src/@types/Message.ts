import { MediaType } from "./Message/Message";

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
}

export interface MessagesState {
  sent: Message[];
  recieved: Message[];
  system: Message[];
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
