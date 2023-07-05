import path from "path";
import fs from "fs";
import logger from "jet-logger";
import io from "socket.io";

interface Room {
  id: string;
  name: string;
  users: number;
}

const shoulUpdateCount = (currentRoom: Room, rooms: Room[]): boolean => {
  return (
    rooms.indexOf(
      // @ts-ignore
      (record: Room) => String(record.id) === String(currentRoom.id)
    ) !== -1
  );
};

const getUpatedUserCountRooms = (io: any, rooms: Room[]): Room[] => {
  rooms.forEach((room) => {
    // @ts-ignore
    const userSet = io.sockets.adapter.rooms?.get(String(room.id));
    room.users = userSet ? [...userSet].length : 0;
  });

  return rooms;
};

export const getRooms = (
  io: any,
  currentRoom: Room,
  roomsType: "public" | "private" = "public"
): Room[] => {
  const filePath = path
    .join(__dirname, `repos/${roomsType}-rooms.json`)
    .replace("helper/", "");

  let rooms: Room[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const s = shoulUpdateCount(currentRoom, rooms);
  console.log(s);
  // rooms = s ? getUpatedUserCountRooms(io, rooms) : rooms;
  rooms = getUpatedUserCountRooms(io, rooms);

  fs.writeFileSync(filePath, JSON.stringify(rooms));
  logger.info(`Rooms file ${filePath} updated.`);

  return rooms;
};
