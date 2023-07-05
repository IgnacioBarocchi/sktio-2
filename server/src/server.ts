import {
  handleJoinRoomEvent,
  handleSendMessageEvent,
  handleSendRoomUpdateEvent,
  handleSendUserStatusEvent,
} from "./services/SocketService";
import {
  JOIN_ROOM_EVENT,
  SEND_MESSAGE_EVENT,
  SEND_USER_STATUS_EVENT,
  SEND_ROOM_UPDATE_EVENT,
} from "./util/SocketEvents";
import logger from "jet-logger";
import { getPublicRooms } from "./services/PublicRoomsService";

const express = require("express");
const app = express();
const http = require("http");
const https = require("https"); // require https instead of http
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
app.use(express.static("public"));
let server;

const IS_PROD = false;

if (IS_PROD) {
  app.use(express.static("public"));
  const options = {
    key: fs.readFileSync("./public/certificates/ssl/server.key"),
    cert: fs.readFileSync("./public/certificates/ssl/server.crt"),
  };
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    //Array.from(ALLOWED_ORIGINS_MAP.values()),
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/api/public-rooms", getPublicRooms(io));

interface Room {
  room: string;
  token?: string;
  acceptMedia: boolean;
  acceptLinks: boolean;
  maxUsers: number;
  region: string;
}

app.post("/api/rooms/:type", (req: Request, res: Response) => {
  // @ts-ignore
  const roomType = req.params.type;
  if (roomType !== "private" && roomType !== "public") {
    // @ts-ignore
    res.status(400).json({ error: "Invalid room type" });
    return;
  }
  console.log(req.body);
  if (!req.body) {
    logger.info("ERROR");
    return;
  }
  const { room, token, acceptMedia, acceptLinks, maxUsers, region } =
    // @ts-ignore
    req.body as Room;

  // Read the JSON data from file
  const filePath = path.join(__dirname, `repos/${roomType}-rooms.json`);
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data: Room[] = JSON.parse(jsonData);

  // Check if room already exists in data
  if (data.some((item) => item.room === room)) {
    // @ts-ignore
    res.status(409).json({ error: "Room already exists" });
    return;
  }

  // Add new record to data
  const newRecord: Room = {
    room,
    token,
    acceptMedia,
    acceptLinks,
    maxUsers,
    region,
  };
  data.push(newRecord);

  // Write updated data to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res
    // @ts-ignore
    .status(201)
    .json({ message: "Room created successfully", data: newRecord });
});

app.get("/api/hello", (req: Request, res: Response) => {
  // @ts-ignore
  res.send("Hello from server!");
});

function handleConnection(socket: {
  id: any;
  handshake: { address: any };
  on: (arg0: string, arg1: () => void) => void;
}) {
  console.info(`
    💻 User Connected: ${socket.id}
    💻 New connection from  ${JSON.stringify(socket.handshake.address, null, 2)}
  `);

  socket.on("disconnect", () => {
    console.info(`
      💻 User Disconnected: ${socket.id}
    `);
  });

  // @ts-ignore
  socket.on(JOIN_ROOM_EVENT, (data) => {
    handleJoinRoomEvent(io, socket, data);
  });
  // @ts-ignore
  socket.on(SEND_MESSAGE_EVENT, handleSendMessageEvent);
  // @ts-ignore
  socket.on(SEND_USER_STATUS_EVENT, handleSendUserStatusEvent);
  // @ts-ignore
  socket.on(SEND_ROOM_UPDATE_EVENT, handleSendRoomUpdateEvent);
}

io.on("connection", handleConnection);

// **** Export default **** //

export default server;

// app.use(ipAllowListMiddleware);

// const ALLOWED_IPS = [
//   "127.0.0.1",
//   "192.168.1.1",
//   "192.168.43.152",
//   "84.15.190.191",
//   "http://localhost:3000",
//   "https://localhost:3000",
// ];

// // Define a list of allowed IP addresses

// // Middleware function to check the request IP address
// const ipAllowListMiddleware = (
//   req: { ip: any },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       send: { (arg0: string): void; new (): any };
//     };
//   },
//   next: () => void
// ) => {
//   const ipAddress = req.ip;
//   if (ALLOWED_IPS.includes(ipAddress)) {
//     next();
//   } else {
//     console.log("no IP address");
//     res.status(403).send("Access denied");
//   }
// };
