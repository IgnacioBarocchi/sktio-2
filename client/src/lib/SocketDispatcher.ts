import { Dispatch } from "../@types/ApplicationStated";
import { Socket } from "socket.io-client";
import System, { SystemMessageType } from "../constants/System";
// @ts-ignore
import { DefaultEventsMap } from "socket.io/dist/typed-events";
const system = System.getInstance();

/**
Dispatches the join room event to the server via the socket and updates the app state accordingly.
@param {Socket} socket - The socket instance to connect to the server.
@param {any} session - The session object containing user's session data.
@param {string} room - The room name to which the user will join.
*/
const dispatchJoinRoomSocket = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  session: any,
  room: string
) => {
  // ! If the user is in the previous room, the user should leave it
  // ! with the SEND_ROOM_UPDATE event
  if (session.room) {
    socket.emit("SEND_ROOM_UPDATE", {
      fromUserId: session.userId,
      fromUserColor: session.userColor,
      leavingRoomId: session.room,
    });
  }

  // ! After leaving the room, the user will join the new one
  socket.emit("JOIN_ROOM", {
    room,
    userId: session.userId,
    fromUserId: session.userId,
    fromUserColor: session.userColor,
  });
};

const dispatchJoinRoomAppState = (
  dispatch: Dispatch,
  session: any,
  room: string
) => {
  dispatch({
    type: "SET_USER_SESSION",
    // @ts-ignore
    payload: { room },
  });

  dispatch({
    type: "UPDATE_MESSAGING_DATA_STATE",
    payload: {
      system: {
        fromSystem: true,
        fromUserId: session.userId,
        fromUserColor: session.userColor,
        // @ts-ignore
        text: system.Label.JOINED_THE_ROOM as SystemMessageType,
      },
    },
  });

  dispatch({
    type: "CLEAN_HISTORY_STATE",
    payload: { room },
  });

  dispatch({
    type: "FETCH_PUBLIC_ROOMS",
    payload: true,
  });
};

/**
 * @returns {[function, function]}
 * Returns an array of functions to dispatch the join room event to the server via the socket and update the app state accordingly.
 */

export const dispatchJoinRoom = (): [
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    session: any,
    room: string
  ) => void,
  (dispatch: Dispatch, session: any, room: string) => void
] => [dispatchJoinRoomSocket, dispatchJoinRoomAppState];
