import { useEffect, useState } from "react";
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
import { dispatchJoinRoom } from "../../../lib/SocketDispatcher";
import { PublicRoom } from "../../../@types/Room/Room";
import { useApplicationState } from "../../../containers/Context";

export const Rooms = ({ socket }: { socket: Socket }) => {
  const {
    state: { session, shouldFetch, publicRooms, uiVariables },
    dispatch,
  } = useApplicationState();

  // Define a new state variable to keep track of the hovered room ID
  const [hoveredRoomId, setHoveredRoomId] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8585/api/public-rooms");
      const data = await response.json();
      dispatch({ type: "SET_PUBLIC_ROOMS", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (shouldFetch === true) {
      console.count("use Aside");
      fetchData();
      dispatch({ type: "FETCH_PUBLIC_ROOMS", payload: false });
    }
  }, [shouldFetch]);

  const handleJoinRoom = (room: PublicRoom) => {
    if (session.room !== room.id) {
      const [dispatchJoinRoomSocket, dispatchJoinRoomAppState] =
        dispatchJoinRoom();
      dispatchJoinRoomSocket(socket, session, room.id);
      dispatchJoinRoomAppState(dispatch, session, room.id);
    }
  };

  const handleMouseEnter = (roomId: string) => setHoveredRoomId(roomId);
  const handleMouseLeave = () => setHoveredRoomId("");

  const displayPublicRooms = (room: PublicRoom) => {
    const isHovered = hoveredRoomId === room.id; // Check if the current room ID matches the hovered room ID
    return (
      <RoomItem
        onClick={() => handleJoinRoom(room)}
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
    <RoomsContainer isSmallDevice={uiVariables.isSmallDevice}>
      {publicRooms.map(displayPublicRooms)}
    </RoomsContainer>
  );
};

export default Rooms;
