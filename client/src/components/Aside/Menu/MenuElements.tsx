import { useState } from "react";
import { StyledBackground } from "../../UI/Background";
import { Socket } from "socket.io-client";
import { useApplicationState } from "../../../containers/Context";
import { StyledInputWithButton } from "../../UI/Input";
import { dispatchJoinRoom } from "../../../lib/SocketDispatcher";
import styled from "styled-components";
import UI from "../../../constants/UI";
import { useSktioStore } from "../../../store/store";
import {
  JOIN_ROOM_EVENT,
  SEND_ROOM_UPDATE_EVENT,
} from "../../../lib/socketEvents";

export const Nav = styled(StyledBackground).attrs(
  (props: { isSmallDevice: boolean }) => ({
    isSmallDevice: props.isSmallDevice,
    as: "nav",
  })
)`
  grid-area: top-menu-area;
  border: none;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: self-start;
  padding: 0;

  width: ${({ isSmallDevice }) =>
    UI.dimensions.getter.asideWidth(isSmallDevice)};
  height: ${UI.dimensions.map.get("nav-height") + "vh"};
`;

export const Aside = styled.aside<{ isSmallDevice: boolean }>`
  //! position fixed para que no salte en el auto scroll del chat
  // position: fixed;
  width: ${({ isSmallDevice }) =>
    UI.dimensions.getter.asideWidth(isSmallDevice)};
  background: ${({ theme }) => theme.background.primary};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

// /*background: blue;*/
export const Ul = styled(StyledBackground).attrs({
  as: "ul",
})`
  width: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Li = styled(StyledBackground).attrs({
  as: "li",
})`
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

export const JoinRoom = ({ socket }: { socket: Socket }) => {
  const { sessionState, setSessionState, roomsState, setRoomsState } =
    useSktioStore((state) => ({
      sessionState: state.sessionState,
      setSessionState: state.setSessionState,
      roomsState: state.roomsState,
      setRoomsState: state.setRoomsState,
    }));

  const [roomId, setRoomId] = useState<string>("");

  const joinRoom = () => {
    if (roomId !== "") {
      sessionState.room = roomId;
      setSessionState(sessionState);
      socket.emit(SEND_ROOM_UPDATE_EVENT, {
        fromUserId: sessionState.userId,
        fromUserColorIndex: sessionState.userColorIndex,
        leavingRoomId: sessionState.room,
      });

      socket.emit(JOIN_ROOM_EVENT, {
        room: roomId,
        userId: sessionState.userId,
        fromUserId: sessionState.userId,
        fromUserColorIndex: sessionState.userColorIndex,
      });

      roomsState.shouldFetch = true;
      setRoomsState(roomsState);
    }
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <StyledInputWithButton
        inputPlaceholder={"Room ID"}
        buttons={[{ onClick: joinRoom, icon: "arrow-turn-down" }]}
        handleInputOnChange={(event) => {
          setRoomId(event.target.value);
        }}
        handleInputOnKeyPress={(event) => {
          if (event.key === "Enter") {
            joinRoom();
          }
        }}
      />
    </div>
  );
};

// dispatch({
//   type: "SET_USER_SESSION",
//   // @ts-ignore
//   payload: { room },
// });

// dispatch({
//   type: "UPDATE_MESSAGING_DATA_STATE",
//   payload: {
//     system: {
//       fromSystem: true,
//       fromUserId: session.userId,
//       fromUserColor: session.userColor,
//       // @ts-ignore
//       text: system.Label.JOINED_THE_ROOM as SystemMessageType,
//     },
//   },
// });

// dispatch({
//   type: "CLEAN_HISTORY_STATE",
//   payload: { room },
// });

// dispatch({
//   type: "FETCH_PUBLIC_ROOMS",
//   payload: true,
// });

// const [dispatchJoinRoomSocket, dispatchJoinRoomAppState] =
//   dispatchJoinRoom();
// dispatchJoinRoomSocket(socket, session, room);
// dispatchJoinRoomAppState(dispatch, session, room);
