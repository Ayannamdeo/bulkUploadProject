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
exports.BlogService = void 0;
const repositories_1 = require("./repositories");
class BlogService {
    constructor() {
        this.getAllContent = (offset, limit, sort) => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.getAll(offset, limit, sort);
        });
        this.getContentById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.getById(id);
        });
        this.createContent = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.create(data);
        });
        this.updateContent = (id, data) => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.update(id, data);
        });
        this.deleteContent = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.delete(id);
        });
        this.getUserBlogs = (userId, sort, offset, limit) => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.getByUser(userId, sort, offset, limit);
        });
        this.getDocCount = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.blogRepository.docCount();
        });
        this.likeUnlikeBlog = (userId, postId) => __awaiter(this, void 0, void 0, function* () {
            console.log("userId inside likeUnlikeBlog service", userId);
            console.log("postId inside likeUnlikeBlog service", postId);
            return yield this.blogRepository.likeUnlike(userId, postId);
        });
        this.blogRepository = new repositories_1.BlogRepository();
    }
}
exports.BlogService = BlogService;
