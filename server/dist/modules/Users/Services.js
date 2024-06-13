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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("./repositories");
class UserServices {
    constructor() {
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getAll();
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.delete(id);
        });
        this.registerUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const saltRounds = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
            return yield this.userRepository.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getByEmail(email);
        });
        this.userRepository = new repositories_1.UserRepository();
    }
}
exports.UserServices = UserServices;
_a = UserServices;
UserServices.verifyPassword = (currentUser, existingUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(currentUser.password, existingUser.password);
});
UserServices.generateToken = (existingUser, jwtsecret) => {
    return jsonwebtoken_1.default.sign({ userId: existingUser.name, role: existingUser.role }, jwtsecret, {
        expiresIn: 60 * 15,
    });
};
