import { MessagesState } from "./Message";
import { RoomsState } from "./Room";
import { SessionState } from "./Session";
import { UserSettingsState } from "./Setting";
import { UIState } from "./UI";

export type SktioStoreState = {
  messagesState: MessagesState;
  setMessagesState: (messagesState: MessagesState) => void;

  roomsState: RoomsState;
  setRoomsState: (roomsState: RoomsState) => void;

  userSettingsState: UserSettingsState;
  setUserSettingsState: (userSettingsState: UserSettingsState) => void;

  sessionState: SessionState;
  setSessionState: (sessionSate: SessionState) => void;

  UIState: UIState;
  setUIState: (UIState: UIState) => void;
};
