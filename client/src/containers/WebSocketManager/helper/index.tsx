import { Dispatch } from "../../../@types/ApplicationStated";
import {
  RecievedMessagePayload,
  SystemMessagePayload,
} from "../../../@types/Message/Message";
import { PublicRoom } from "../../../@types/Room/Room";
import {
  RECEIVE_JOINING_EVENT,
  RECEIVE_MESSAGE_EVENT,
  RECEIVE_ROOM_UPDATE_EVENT,
  SHOULD_FETCH_PUBLIC_ROOMS,
} from "../../../lib/socketEvents";
import System, { SystemMessageType } from "../../../constants/System";
import { ReceiveMessagePayload } from "../../../@types/WebSocketManager/WebSocketManager";

const system = System.getInstance();
export const getSocketEventHandlers = (dispatch: Dispatch) => {
  const dispatchNewMessageData = (data: ReceiveMessagePayload) => {
    const recievedPayload: RecievedMessagePayload = {
      read: false,
      text: data.message,
      media: data.media,
      fromUserId: data.userId,
      fromUserColorIndex: Number(data.userColorIndex),
      userColorIndex: data.userColorIndex,
      fromUserAlias: data.userAlias,
    };

    dispatch({
      type: "UPDATE_MESSAGING_DATA_STATE",
      payload: { recieved: recievedPayload },
    });
  };

  const dispatchRoomUpdateData = (
    data: SystemMessagePayload,
    text: SystemMessageType
  ) => {
    console.table({ text });
    const systemPayload: SystemMessagePayload = {
      fromSystem: true,
      fromUserId: data.fromUserId,
      fromUserColor: data.fromUserColor,
      fromUserColorIndex: data.fromUserColorIndex,
      text,
    };

    dispatch({
      type: "UPDATE_MESSAGING_DATA_STATE",
      payload: {
        system: systemPayload,
      },
    });
  };

  const socketEventHandlers = [
    {
      eventName: RECEIVE_MESSAGE_EVENT,
      handler: dispatchNewMessageData,
    },
    {
      eventName: RECEIVE_ROOM_UPDATE_EVENT,
      handler: (data: SystemMessagePayload) =>
        dispatchRoomUpdateData(
          data,
          system.Label.LEFT_THE_ROOM as unknown as SystemMessageType
        ),
    },
    {
      eventName: RECEIVE_JOINING_EVENT,
      handler: (data: SystemMessagePayload) =>
        dispatchRoomUpdateData(
          data,
          system.Label.JOINED_THE_ROOM as unknown as SystemMessageType
        ),
    },
    {
      eventName: "SET_PUBLIC_ROOMS",
      handler: (data: PublicRoom[]) =>
        dispatch({ type: "SET_PUBLIC_ROOMS", payload: data }),
    },
  ];
  return socketEventHandlers;
};
