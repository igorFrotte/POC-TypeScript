import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

server.get("/status", (req, res) => {
  res.sendStatus(200);
});

server.listen(
  4000,
  console.log(`Listening to PORT 4000`)
);