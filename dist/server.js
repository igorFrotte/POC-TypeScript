import express from "express";
import cors from "cors";
import taskRouter from "./routers/task.router.js";
var server = express();
server.use(express.json());
server.use(cors());
server.use(taskRouter);
server.get("/status", function (req, res) {
    res.sendStatus(200);
});
server.listen(4000, function () { return console.log("Listening to PORT 4000"); });
