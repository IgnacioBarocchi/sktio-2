import {
  JOIN_ROOM_EVENT,
  RECEIVE_JOINING_EVENT,
  RECEIVE_MESSAGE_EVENT,
  RECEIVE_ROOM_UPDATE_EVENT,
  RECEIVE_USER_STATUS_EVENT,
} from "@src/util/SocketEvents";
import logger from "jet-logger";
import { getRooms } from "@src/helper/SocketHelper";

const monitorSocket = (event: string, payload: [Object, Object] | any) => {
  logger.info(`event: ${event} ${JSON.stringify(payload, null, 2)}`);
};
// @ts-ignore
export function handleJoinRoomEvent(io, socket, data) {
  monitorSocket(JOIN_ROOM_EVENT, data);
  socket.join(data.room);
  // @ts-ignore
  socket.broadcast.emit("SET_PUBLIC_ROOMS", getRooms(io, data.room, "public"));
}
export function handleSendMessageEvent(data: { room: any }) {
  monitorSocket(RECEIVE_MESSAGE_EVENT, data);
  // @ts-ignore
  this.to(data.room).emit(RECEIVE_MESSAGE_EVENT, data);
}

export function handleSendUserStatusEvent(data: { room: any }) {
  monitorSocket(RECEIVE_USER_STATUS_EVENT, data);
  // @ts-ignore
  this.to(data.room).emit(RECEIVE_USER_STATUS_EVENT, data);
}

export function handleSendRoomUpdateEvent(data: {
  leavingRoomId: any;
  room: any;
}) {
  monitorSocket(RECEIVE_ROOM_UPDATE_EVENT, data);

  // @ts-ignore
  this.leave(data?.leavingRoomId); // !empty socket room
  // @ts-ignore
  this.to(data.leavingRoomId).emit(RECEIVE_ROOM_UPDATE_EVENT, data); // !notify others in the previous room that the socket left
}

// @ts-ignore
// emitShouldFetch(this);
// const filePath = path
//   .join(__dirname, "repos/public-rooms.json")
//   .replace("services/", "");

// fs.readFile(filePath, "utf8", (err, data) => {
//   if (
//     JSON.parse(data).indexOf(
//       // @ts-ignore
//       (record) => String(record.id) === String(room)
//     ) !== -1
//   ) {
//     // @ts-ignore
//     socket.broadcast.emit("SHOULD_FETCH_PUBLIC_ROOMS", { shouldFetch: true });
//   }
// });
