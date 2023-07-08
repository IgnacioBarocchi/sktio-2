import { useEffect } from "react";
import { Socket } from "socket.io-client";
import {
  UsersCount,
  RoomDetails,
  RoomFeatures,
  RoomItem,
  RoomsContainer,
  RoomTopic,
  UsersCountContainer,
} from "./RoomElements";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import Icon from "../../UI/Icon";
import { useSktioStore } from "../../../store/store";

import switchRoom from "../../../lib/switchRoom";
import { PublicRoom } from "../../../@types/Room";
import { signal } from "@preact/signals-react";

export const Rooms = ({ socket }: { socket: Socket }) => {
  const {
    roomsState,
    setRoomsState,
    UIState,
    sessionState,
    setSessionState,
    setMessagesState,
  } = useSktioStore((state) => ({
    roomsState: state.roomsState,
    setRoomsState: state.setRoomsState,
    UIState: state.UIState,
    sessionState: state.sessionState,
    setSessionState: state.setSessionState,
    setMessagesState: state.setMessagesState,
  }));

  // Define a new state variable to keep track of the hovered room ID
  const hoveredRoomId = signal("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8585/api/public-rooms");
      const data = await response.json();
      roomsState.publicRooms = data;
      setRoomsState(roomsState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (roomsState.shouldFetch === true) {
      console.log("is fetching");
      console.count("use Aside");
      fetchData();
      roomsState.shouldFetch = false;
      setRoomsState(roomsState);
    }
  }, [roomsState.shouldFetch]);

  const handleJoinRoom = (roomId: PublicRoom["id"]) => {
    switchRoom(socket, roomId, {
      sessionState,
      setSessionState,
      setMessagesState,
      roomsState,
      setRoomsState,
    });
  };

  const handleMouseEnter = (roomId: string) => {
    hoveredRoomId.value = roomId;
  };

  const handleMouseLeave = () => {
    hoveredRoomId.value = "";
  };

  const displayPublicRooms = (room: PublicRoom) => {
    const isHovered = hoveredRoomId.value === room.id; // Check if the current room ID matches the hovered room ID
    return (
      <RoomItem
        onClick={() => handleJoinRoom(room.id)}
        key={room.id}
        onMouseEnter={() => handleMouseEnter(room.id)}
        onMouseLeave={handleMouseLeave}
      >
        <UsersCountContainer>
          <UsersCount isHovered={isHovered}>{room.users}</UsersCount>
        </UsersCountContainer>

        <RoomTopic isHovered={isHovered}>{room.topic}</RoomTopic>
        <RoomDetails>
          <RoomFeatures gap={8}>
            {/* <Icon icon={"comment"} size="2x" /> */}
            <FlexBoxWithSpacing column gap={8}>
              {!room.acceptMedia && <Icon icon={"video-slash"} />}
              {!room.acceptLinks && <Icon icon={"link-slash"} />}
            </FlexBoxWithSpacing>
          </RoomFeatures>
        </RoomDetails>
      </RoomItem>
    );
  };
  return (
    // <RoomsContainer isSmallDevice={uiVariables.isSmallDevice}>
    <RoomsContainer isSmallDevice={UIState.isSmallDevice}>
      {/* {publicRooms.map(displayPublicRooms)} */}
      {roomsState?.publicRooms?.length > 0 &&
        roomsState.publicRooms.map(displayPublicRooms)}
    </RoomsContainer>
  );
};

export default Rooms;
