import { useState } from "react";
import { StyledBackground } from "../../UI/Background";
import { Socket } from "socket.io-client";
import { useApplicationState } from "../../../containers/Context";
import { StyledInputWithButton } from "../../UI/Input";
import { dispatchJoinRoom } from "../../../lib/SocketDispatcher";
import styled from "styled-components";
import UI from "../../../constants/UI";

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
  const {
    state: { session },
    dispatch,
  } = useApplicationState();

  const [room, setRoom] = useState<string>("");

  const joinRoom = () => {
    if (room !== "") {
      const [dispatchJoinRoomSocket, dispatchJoinRoomAppState] =
        dispatchJoinRoom();
      dispatchJoinRoomSocket(socket, session, room);
      dispatchJoinRoomAppState(dispatch, session, room);
    }
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <StyledInputWithButton
        inputPlaceholder={"Room ID"}
        buttons={[{ onClick: joinRoom, icon: "arrow-turn-down" }]}
        handleInputOnChange={(event) => {
          setRoom(event.target.value);
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
