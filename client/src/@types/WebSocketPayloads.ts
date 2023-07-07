import { SystemMessageType } from "../constants/System";

export type MediaType = {
  type: "image" | "audio";
  src: string;
  localURL?: string;
};

export interface MessageOPTProps {
  color?: string;
  fromUserColor?: string;
  fromUserColorIndex?: number;
  fromUserId?: string;
  text?: string | undefined;
  isSent?: boolean;
  fromSystem?: boolean;
  fromUserAlias?: string;
  media?: MediaType;
}

export interface SystemMessagePayload {
  fromSystem: true;
  fromUserId?: string;
  fromUserColor?: string;
  fromUserColorIndex?: number;
  fromUserAlias?: string;
  text?: SystemMessageType;
}

export interface RecievedMessagePayload {
  read?: boolean;
  text: string;
  media?: MediaType;
  fromUserId: string;
  fromUserColorIndex: number;
  fromUserAlias?: string;
  userColorIndex?: number;
}

export interface SentMessagePayload {
  text: string;
  isSent: boolean;
  media?: MediaType;
}

export interface MessagingDataPayload {
  system?: SystemMessagePayload;
  recieved?: RecievedMessagePayload;
  sent?: SentMessagePayload;
}
export interface ReceiveMessagePayload {
  read: boolean;
  message: string;
  userId: string;
  userColor: string;
  userAlias: string;
  media?: MediaType;
  userColorIndex?: number;
}

export interface RoomUpdatePayload {
  fromUserId: string;
  fromUserColor: string;
  fromUserColorIndex?: number;
}
