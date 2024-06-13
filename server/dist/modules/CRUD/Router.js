"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_Router = void 0;
const Controllers_1 = require("./Controllers");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../lib/middlewares/authMiddleware");
class CRUD_Router_Class {
    constructor() {
        this.router = express_1.default.Router();
        this.CRUD_Controllers = new Controllers_1.CRUD_Controllers();
        this.setMiddlewares();
        this.setupRoutes();
    }
    static getInstance() {
        if (!CRUD_Router_Class.instance) {
            CRUD_Router_Class.instance = new CRUD_Router_Class();
        }
        return CRUD_Router_Class.instance;
    }
    setMiddlewares() {
        this.router.use(authMiddleware_1.AuthMiddleware.authenticate);
    }
    setupRoutes() {
        this.router.get('/', this.CRUD_Controllers.getAllContent);
        //    this.router.get("/", (req: Request, res: Response) => {
        //      this.CRUD_Controllers.getAllContent(req, res);
        //    });
        this.router.get('/:id', this.CRUD_Controllers.getContentById);
        this.router.post('/', this.CRUD_Controllers.createContent);
        this.router.put('/:id', this.CRUD_Controllers.updateContent);
        this.router.delete('/:id', this.CRUD_Controllers.deleteContent);
    }
}
const CRUD_Router_Class_instance = CRUD_Router_Class.getInstance();
const CRUD_Router = CRUD_Router_Class_instance.router;
exports.CRUD_Router = CRUD_Router;
