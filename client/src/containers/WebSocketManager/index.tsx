import { FC, useEffect } from "react";
// @ts-ignore
import { Socket } from "socket.io";
// @ts-ignore
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import io from "socket.io-client";
import System from "../../constants/System";
import { getSocketEventHandlers } from "./helper";
import { useSktioStore } from "../../store/store";
// @ts-ignore

const system = System.getInstance();
const socket: Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> = io
  // @ts-ignore
  .connect(system.EndpoinMap.get("dev-backloop-8585"));

const WebSocketManager: FC<WebSocketManagerProps> = ({
  children,
}): JSX.Element => {
  const { messagesState, setMessagesState, roomsState, setRoomsState } =
    useSktioStore((state) => ({
      messagesState: state.messagesState,
      setMessagesState: state.setMessagesState,
      roomsState: state.roomsState,
      setRoomsState: state.setRoomsState,
    }));
  // const { dispatch } = useApplicationState();

  const handleConnectError = (error: Error) => {
    // dispatch({
    //   type: "SET_SYSTEM_MESSAGE",
    //   payload: { type: "error", message: error.message },
    // });

    console.count(`Socket error: ${error.message}`);
  };

  useEffect(() => {
    console.log(`Connect`);
    const socketEventHandlers = getSocketEventHandlers(
      messagesState,
      setMessagesState,
      roomsState,
      setRoomsState
    );

    socketEventHandlers.forEach((eventHandler) => {
      console.log("on " + eventHandler.eventName);
      socket.on(eventHandler.eventName, eventHandler.handler);
    });

    socket.on("connect_error", handleConnectError);

    return () => {
      socketEventHandlers.forEach((eventHandler) => {
        socket.off(eventHandler.eventName, eventHandler.handler);
      });
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, []);

  if (socket) return children(socket) as JSX.Element;
  else return children as unknown as JSX.Element;
};

export default WebSocketManager;

interface WebSocketManagerProps {
  children(socket?: Socket): React.ReactNode | JSX.Element;
}
