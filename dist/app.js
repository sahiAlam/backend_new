"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// Middleware
const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
exports.app.use((0, cors_1.default)(corsOption));
exports.app.use(express_1.default.json({ limit: "1mb" }));
// app.use(bodyParser.json());
exports.app.use("/auth", auth_route_1.default);
