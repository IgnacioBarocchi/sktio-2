import { MediaType } from "../Message/Message";

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

export interface WebSocketManagerProps {
  children(socket?: Socket): React.ReactNode | JSX.Element;
}
