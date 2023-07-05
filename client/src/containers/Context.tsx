// Context.tsx
import React, { useContext, useReducer, createContext } from "react";
import { Action, Dispatch, State } from "../@types/ApplicationStated";
import DEFAULT_STATE from "./defaultAppState";

const ApplicationStateContext = createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: {
    ...DEFAULT_STATE,
  },
  dispatch: () => null,
});

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER_SESSION":
      return {
        ...state,
        session: { ...state.session, ...action.payload },
      };
    case "UPDATE_MESSAGING_DATA_STATE":
      const recievedMessage =
        action.payload?.[
          Object.keys(action.payload)[0] as "system" | "recieved" | "sent"
        ];

      let messages = state.messages ? [...state.messages] : [];

      if (state.settings.useHistory) {
        if (messages.length === 100) {
          messages.shift(); // Remove the first item
        }

        messages.push(recievedMessage);
      }

      console.table({ recievedMessage });
      console.log("%c" + JSON.stringify(messages), "color: blue");

      return {
        ...state,
        recievedMessage,
        messages,
      };

    case "UPDATE_SETTINGS_STATE":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case "UPDATE_UI_STATE":
      return {
        ...state,
        uiVariables: { ...state.uiVariables, ...action.payload },
      };
    case "CLEAN_HISTORY_STATE":
      const n = {
        ...state,
        messages: [],
        session: { ...state.session, ...action.payload },
      };
      console.log(n);
      return n;
    case "SET_SYSTEM_MESSAGE":
      return {
        ...state,
        systemMessage: { ...state.systemMessage, ...action.payload },
      };
    case "FETCH_PUBLIC_ROOMS":
      return { ...state, shouldFetch: action.payload };
    case "SET_PUBLIC_ROOMS":
      return { ...state, publicRooms: action.payload };
    case "SET_SMALL_DEVICE":
      return {
        ...state,
        uiVariables: { ...state.uiVariables, ...action.payload },
      };
    default:
      return state;
  }
};

export const ApplicationStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(stateReducer, DEFAULT_STATE);

  return (
    <ApplicationStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationStateContext.Provider>
  );
};

export const useApplicationState = () => {
  const context = useContext(ApplicationStateContext);

  if (!context)
    throw new Error(
      "useApplicationState must be used within a ApplicationStateProvider"
    );

  return context;
};
