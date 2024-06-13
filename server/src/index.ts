// Develop a register API for signup.

// Implement an API for login.

// Substitute the current authentication middleware with a real one.

import { Server } from "./server";
import {serverConfig} from "./config";

const server: Server = Server.getInstance(serverConfig);
server.run();