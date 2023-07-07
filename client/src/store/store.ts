import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { RoomsState } from "../@types/Room";
import { UIState } from "../@types/UI";
import { UserSettingsState } from "../@types/Setting";
import { SessionState } from "../@types/Session";
import { Message, MessagesState } from "../@types/Message";

export type SktioStoreState = {
  messagesState: Message[];
  setMessagesState: (messagesState: Message[]) => void;

  messagesState2: MessagesState;
  setMessagesState2: (messagesState: MessagesState) => void;

  roomsState: RoomsState;
  setRoomsState: (roomsState: RoomsState) => void;

  userSettingsState: UserSettingsState;
  setUserSettingsState: (userSettingsState: UserSettingsState) => void;

  sessionState: SessionState;
  setSessionState: (sessionState: SessionState) => void;

  UIState: UIState;
  setUIState: (UIState: UIState) => void;
};

export const useSktioStore = create<SktioStoreState>()(
  subscribeWithSelector((set) => ({
    messagesState: [],
    setMessagesState: (messagesState: Message[]): void => {
      set({ messagesState });
    },

    messagesState2: {
      sent: [],
      recieved: [],
      system: [],
    },
    setMessagesState2: (messagesState2: MessagesState): void => {
      set({ messagesState2 });
    },

    roomsState: {
      shouldFetch: true,
      publicRooms: [],
      privateRooms: [],
    },
    setRoomsState: (roomsState: RoomsState): void => {
      set({ roomsState });
    },

    userSettingsState: {
      useHistory: true,
      revealLocation: false,
      useButtons: false,
      aceptMedia: true,
      aceptLinks: true,
      useLocalStorage: false,
      sessionSettingsIsVisible: true,
    },
    setUserSettingsState: (userSettingsState: UserSettingsState): void => {
      set({ userSettingsState });
    },

    sessionState: {
      userId: Math.floor(Math.random() * 1_000)
        .toString()
        .padStart(3, "0"),
      userAlias: "",
      room: "",
      userIsActive: true,
      userColorIndex: Math.floor(Math.random() * 16),
    },
    setSessionState: (sessionState: SessionState): void => {
      set({ sessionState });
    },

    UIState: {
      headerHeight: 0,
      messengerUserPannelHeight: 0,
      messengerColumnHeight: 0,
      emojiPickerIsVisible: false,
      isSmallDevice: undefined,
      selectedTab: 0,
    },
    setUIState: (UIState: UIState): void => {
      set({ UIState });
    },
  }))
);
