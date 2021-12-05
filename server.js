// @ts-check

const path = require('path');

const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, { path: "/mmsocket" })

const ENV_PORT = process.env["PORT"] || 8080;

const modules = require("./src/app/modules/modules.node").modules_node;

io.on("connection", (socket) => {
    console.log("client connected");

    modules.forEach((mod) => {
        for (let socketEvent in mod.onSocket) {
            socket.on(socketEvent, data => mod.onSocket[socketEvent](socket, data));
        }
    })
});

app.use(express.static(path.join(__dirname, "dist/front")));

httpServer.listen(ENV_PORT, () => {
    console.log(`httpServer.listen ~ ${ENV_PORT}`)
});
