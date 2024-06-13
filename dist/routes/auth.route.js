"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.get("/", auth_controller_1.getHomeRoute);
router.post("/register", auth_controller_1.userRegistration);
router.post("/login", auth_controller_1.userLogin);
exports.default = router;
