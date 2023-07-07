import {
  RECEIVE_JOINING_EVENT,
  RECEIVE_MESSAGE_EVENT,
  RECEIVE_ROOM_UPDATE_EVENT,
  SET_PUBLIC_ROOMS,
  // SHOULD_FETCH_PUBLIC_ROOMS,
} from "../../../lib/socketEvents";
import System, { SystemMessageType } from "../../../constants/System";
import { PublicRoom, RoomsState } from "../../../@types/Room";
import { MessagesState } from "../../../@types/Message";
import {
  ReceiveMessagePayload,
  RecievedMessagePayload,
  SystemMessagePayload,
} from "../../../@types/WebSocketPayloads";

const system = System.getInstance();
export const getSocketEventHandlers = (
  messagesState: MessagesState,
  setMessagesState: (value: MessagesState) => void,
  roomsState: RoomsState,
  setRoomsState: (value: RoomsState) => void
) => {
  const dispatchNewMessageData = (data: ReceiveMessagePayload) => {
    alert("ReceiveMessage");
    const recievedPayload: RecievedMessagePayload = {
      read: false,
      text: data.message,
      media: data.media,
      isSent: false,
      fromUserId: data.userId,
      fromUserColorIndex: Number(data.userColorIndex),
      userColorIndex: data.userColorIndex,
      fromUserAlias: data.userAlias,
    };

    messagesState.recieved.push(recievedPayload);
    setMessagesState(messagesState);
  };

  const dispatchRoomUpdateData = (
    data: SystemMessagePayload,
    text: SystemMessageType
  ) => {
    alert("update room");

    const systemPayload: SystemMessagePayload = {
      fromSystem: true,
      fromUserId: data.fromUserId,
      fromUserColor: data.fromUserColor,
      fromUserColorIndex: data.fromUserColorIndex,
      text,
      isSent: false,
    };
    messagesState.system.push(systemPayload);
    setMessagesState(messagesState);
    // messagesState.system.push(systemPayload);
    // dispatch({
    //   type: "UPDATE_MESSAGING_DATA_STATE",
    //   payload: {
    //     system: systemPayload,
    //   },
    // });
  };

  const socketEventHandlers = [
    {
      eventName: RECEIVE_MESSAGE_EVENT,
      handler: dispatchNewMessageData,
    },
    {
      eventName: RECEIVE_ROOM_UPDATE_EVENT,
      handler: (data: SystemMessagePayload) => {
        alert("dentro del hadler " + RECEIVE_ROOM_UPDATE_EVENT);
        dispatchRoomUpdateData(
          data,
          system.Label.LEFT_THE_ROOM as unknown as SystemMessageType
        );
      },
    },
    {
      eventName: RECEIVE_JOINING_EVENT,
      handler: (data: SystemMessagePayload) => {
        alert("dentro del hadler " + RECEIVE_JOINING_EVENT);
        dispatchRoomUpdateData(
          data,
          system.Label.JOINED_THE_ROOM as unknown as SystemMessageType
        );
      },
    },
    {
      eventName: SET_PUBLIC_ROOMS,
      handler: (data: PublicRoom[]) => {
        alert("dentro del hadler " + SET_PUBLIC_ROOMS);
        roomsState.publicRooms = data;
        setRoomsState(roomsState);
        // dispatch({ type: "SET_PUBLIC_ROOMS", payload: data })
      },
    },
  ];
  return socketEventHandlers;
};
