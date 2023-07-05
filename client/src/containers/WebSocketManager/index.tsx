import { useEffect } from "react";
// @ts-ignore
import { Socket } from "socket.io";
// @ts-ignore
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import io from "socket.io-client";
import { WebSocketManagerProps } from "../../@types/WebSocketManager/WebSocketManager";
import System from "../../constants/System";
import { useApplicationState } from "../../containers/Context";
import { getSocketEventHandlers } from "./helper";
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

const WebSocketManager = ({ children }: WebSocketManagerProps): JSX.Element => {
  const { dispatch } = useApplicationState();

  const handleConnectError = (error: Error) => {
    dispatch({
      type: "SET_SYSTEM_MESSAGE",
      payload: { type: "error", message: error.message },
    });

    console.count(`Socket error: ${error.message}`);
  };

  useEffect(() => {
    const socketEventHandlers = getSocketEventHandlers(dispatch);
    socketEventHandlers.forEach((eventHandler) => {
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
