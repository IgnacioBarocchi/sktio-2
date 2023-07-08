import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { RoomsState } from "../@types/Room";
import type { UIState } from "../@types/UI";
import type { UserSettingsState } from "../@types/Setting";
import type { SessionState } from "../@types/Session";
import type { MessagesState } from "../@types/Message";
import type { SktioStoreState } from "../@types/Store";

export const useSktioStore = create<SktioStoreState>()(
  subscribeWithSelector((set) => ({
    messagesState: [],
    setMessagesState: (messagesState: MessagesState): void => {
      set({ messagesState });
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
      useHistory: {
        UIVisible: true,
        value: true,
      },
      revealLocation: {
        UIVisible: false,
        value: false,
      },
      aceptMedia: {
        UIVisible: false,
        value: true,
      },
      aceptLinks: {
        UIVisible: false,
        value: true,
      },
      useLocalStorage: {
        UIVisible: false,
        value: false,
      },
      sessionSettingsIsVisible: {
        UIVisible: false,
        value: true,
      },
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
