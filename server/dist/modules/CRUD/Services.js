"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_Service = void 0;
const repositories_1 = require("./repositories");
class CRUD_Service {
    constructor() {
        this.getAllContent = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.CRUD_Repository.getAll();
        });
        this.getContentById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.CRUD_Repository.getById(id);
        });
        this.createContent = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield this.CRUD_Repository.create(data);
        });
        this.updateContent = (id, data) => __awaiter(this, void 0, void 0, function* () {
            return yield this.CRUD_Repository.update(id, data);
        });
        this.deleteContent = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.CRUD_Repository.delete(id);
        });
        this.CRUD_Repository = new repositories_1.CRUD_Repository();
    }
}
exports.CRUD_Service = CRUD_Service;
