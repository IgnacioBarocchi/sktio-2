import { Socket } from "socket.io-client";
import { MessagesState } from "../@types/Message";
import { RoomsState } from "../@types/Room";
import { PrivateRoom, PublicRoom } from "../@types/Room/Room";
import { SessionState } from "../@types/Session";
import { JOIN_ROOM_EVENT, SEND_ROOM_UPDATE_EVENT } from "./socketEvents";

const updateSession = (
  roomId: PublicRoom["id"] | PrivateRoom["id"],
  sessionState: SessionState,
  setSessionState: (sessionState: SessionState) => void
) => {
  sessionState.room = roomId;
  setSessionState(sessionState);
};

const clearConversation = (
  setMessagesState: (messagesState: MessagesState) => void
) => {
  setMessagesState({
    sent: [],
    recieved: [],
    system: [],
  });
};

const notifyOthers = (socket: Socket, sessionState: SessionState) => {
  socket.emit(SEND_ROOM_UPDATE_EVENT, {
    fromUserId: sessionState.userId,
    fromUserColorIndex: sessionState.userColorIndex,
    leavingRoomId: sessionState.room,
  });
};

const joinRoom = (
  socket: Socket,
  roomId: PublicRoom["id"] | PrivateRoom["id"],
  sessionState: SessionState
) => {
  socket.emit(JOIN_ROOM_EVENT, {
    room: roomId,
    userId: sessionState.userId,
    fromUserId: sessionState.userId,
    fromUserColorIndex: sessionState.userColorIndex,
  });
};
const triggerRoomFetching = (
  roomsState: RoomsState,
  setRoomsState: (roomsState: RoomsState) => void
) => {
  roomsState.shouldFetch = true;
  setRoomsState(roomsState);
};

export default function switchRoom(
  socket: Socket,
  roomId: PublicRoom["id"] | PrivateRoom["id"],
  stateDeps: {
    sessionState: SessionState;
    setSessionState: (sessionState: SessionState) => void;
    setMessagesState: (messagesState: MessagesState) => void;
    roomsState: RoomsState;
    setRoomsState: (roomsState: RoomsState) => void;
  }
) {
  const {
    sessionState,
    setSessionState,
    setMessagesState,
    roomsState,
    setRoomsState,
  } = stateDeps;

  if (sessionState.room === roomId || !roomId) return;

  updateSession(roomId, sessionState, setSessionState);

  if (sessionState?.room) {
    notifyOthers(socket, sessionState);
    clearConversation(setMessagesState);
  }

  joinRoom(socket, roomId, sessionState);

  triggerRoomFetching(roomsState, setRoomsState);
}
