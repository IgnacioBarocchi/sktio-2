import path from "path";
import fs from "fs";
interface Room {
  id: string;
  name: string;
  users: number;
}

export const getPublicRooms = (io: any) => {
  return (req: Request, res: Response): void => {
    const filePath = path.join(__dirname, "../repos/public-rooms.json");

    // @ts-ignore
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        // @ts-ignore
        res.status(500).send("Internal server error");
        return;
      }

      const rooms: Room[] = JSON.parse(data);
      rooms.forEach((room) => {
        const userSet = io.sockets.adapter.rooms?.get(String(room.id));
        room.users = userSet ? [...userSet].length : 0;
      });

      // @ts-ignore
      res.json(rooms);
    });
  };
};
