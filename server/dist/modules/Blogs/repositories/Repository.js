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
exports.BlogRepository = void 0;
const mongoose_1 = require("mongoose");
const ModelSchema_1 = require("./ModelSchema");
class BlogRepository {
    getAll(offset, limit, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel
                .find()
                .sort({ [sort]: -1 })
                .skip(offset)
                .limit(limit);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.findById(id);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.findByIdAndUpdate(id, data, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.findByIdAndDelete(id);
        });
    }
    getByUser(userId, sort, offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPosts = yield ModelSchema_1.blogModel
                .find({ user: userId })
                .find()
                .sort({ [sort]: -1 })
                .skip(offset)
                .limit(limit);
            const totalUserPosts = yield ModelSchema_1.blogModel.countDocuments({ user: userId });
            return { userPosts, totalUserPosts };
        });
    }
    docCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ModelSchema_1.blogModel.countDocuments();
        });
    }
    likeUnlike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside likeUnlike repository");
            console.log("postId", postId);
            const post = yield ModelSchema_1.blogModel.findById(postId);
            console.log("logging post after findByid(postId): ", post);
            if (!post)
                return null;
            // console.log("logging post after findByid(postId): ", post);
            const userObjectId = new mongoose_1.Types.ObjectId(userId);
            const index = post.likes.indexOf(userObjectId);
            if (index === -1) {
                post.likes.push(userObjectId);
            }
            else {
                post.likes.splice(index, 1);
            }
            console.log("logging post before save : ", post);
            yield post.save();
            return post;
        });
    }
}
exports.BlogRepository = BlogRepository;
