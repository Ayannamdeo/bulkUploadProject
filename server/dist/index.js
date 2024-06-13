"use strict";
// Develop a register API for signup.
Object.defineProperty(exports, "__esModule", { value: true });
// Implement an API for login.
// Substitute the current authentication middleware with a real one.
const server_1 = require("./server");
const config_1 = require("./config");
const server = server_1.Server.getInstance(config_1.serverConfig);
server.run();
