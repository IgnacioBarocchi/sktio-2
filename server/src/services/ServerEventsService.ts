// // SSE
// app.get("/chat", (req: Request, res: Response) => {
//   // @ts-ignore
//   res.send("Hello aaaaaaaa server!");

//   // @ts-ignore
//   res.set({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });
//   // @ts-ignore

//   const sendEvent = (event, data) => {
//     // @ts-ignore
//     res.write(`event: ${event}\n`);
//     // @ts-ignore
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   // When a message is received, broadcast it to all clients
//   // by sending an SSE event with the message data
//   // @ts-ignore
//   app.on("message", (message) => {
//     sendEvent("message", message);
//   });
// });

// app.post("/message", (req: Request, res: Response) => {
//   // @ts-ignore
//   const message = req.body.message;
//   // Do something with the message, such as saving it to a database
//   // Emit the message to all clients using SSE
//   app.emit("message", message);
//   // @ts-ignore
//   res.sendStatus(200);
// });

// export const aa = (req: Request, res: Response) => {
//   // @ts-ignore
//   const message = req.body.message;
//   // Do something with the message, such as saving it to a database
//   // Emit the message to all clients using SSE
//   app.emit("message", message);
//   // @ts-ignore
//   res.sendStatus(200);
// };
// export const a = (req: Request, res: Response) => {
//   // @ts-ignore
//   const message = req.body.message;
//   // Do something with the message, such as saving it to a database
//   // Emit the message to all clients using SSE
//   // app.emit("message", message);
//   // @ts-ignore
//   res.sendStatus(200);
// };

export const c = "";
