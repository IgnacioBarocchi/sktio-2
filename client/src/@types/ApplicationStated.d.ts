import { MessagingDataPayload } from "./Message/Message";
import { PublicRoom } from "./Room/Room";

export type Dispatch = (val: Action) => void;
export type State = typeof defaultState;
export interface SessionPayload {
  userId?: string;
  userAlias?: string;
  userColor?: string;
  room?: string;
  userIsActive?: boolean;
}

export interface SettingsPayload {
  useHistory?: boolean;
  revealLocation?: boolean;
  useButtons?: boolean;
  aceptMedia?: boolean;
  aceptLinks?: boolean;
  sessionSettingsIsVisible?: boolean;
}

export interface CLEAN_HISTORY_STATEPayload {
  room: string;
}

export type SET_USER_SESSIONAction = {
  type: "SET_USER_SESSION";
  payload: SessionPayload;
};

export type UPDATE_MESSAGING_DATA_STATEAction = {
  type: "UPDATE_MESSAGING_DATA_STATE";
  payload: MessagingDataPayload;
};

export type UPDATE_SETTINGS_STATEAction = {
  type: "UPDATE_SETTINGS_STATE";
  payload: SettingsPayload;
};

export type CLEAN_HISTORY_STATEAction = {
  type: "CLEAN_HISTORY_STATE";
  payload: CLEAN_HISTORY_STATEPayload | null;
};

export type UPDATE_UI_STATEAction = {
  type: "UPDATE_UI_STATE";
  payload: {
    headerHeight?: number;
    messengerUserPannelHeight?: number;
    messengerColumnHeight?: number;
    emojiPickerIsVisible?: boolean;
    isSmallDevice?: boolean;
  };
};

export type SET_SYSTEM_MESSAGEAction = {
  type: "SET_SYSTEM_MESSAGE";
  payload: {
    type: "error" | "success" | "warning" | null;
    message: string | null;
  };
};

export type FETCH_PUBLIC_ROOMSAction = {
  type: "FETCH_PUBLIC_ROOMS";
  payload: boolean;
};

export type SET_PUBLIC_ROOMSAction = {
  type: "SET_PUBLIC_ROOMS";
  payload: PublicRoom[];
};

export type SET_SMALL_DEVICEAction = {
  type: "SET_SMALL_DEVICE";
  payload: {
    isSmallDevice?: boolean;
  };
};

export type Action =
  | SET_USER_SESSIONAction
  | UPDATE_MESSAGING_DATA_STATEAction
  | UPDATE_SETTINGS_STATEAction
  | CLEAN_HISTORY_STATEAction
  | UPDATE_UI_STATEAction
  | SET_SYSTEM_MESSAGEAction
  | FETCH_PUBLIC_ROOMSAction
  | SET_PUBLIC_ROOMSAction
  | SET_SMALL_DEVICEAction;

export type Dispatch = (val: Action) => void;

export interface State {
  userId: string;
  userAlias: string;
  userColor: string;
  room: string;
  userIsActive: boolean;
  messagingData: MessagingDataPayload;
  settings: SettingsPayload;
  ui: {
    headerHeight: number;
    messengerUserPannelHeight: number;
    messengerColumnHeight: number;
  };
}
