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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegistration = exports.getHomeRoute = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const generateToken_1 = __importDefault(require("../config/generateToken"));
const getHomeRoute = (req, res) => {
    res.send("Api Nicely Working");
};
exports.getHomeRoute = getHomeRoute;
// Registration User
const userRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, terms } = req.body;
    // Validate the request body
    if (!firstName || !lastName || !email || !password || !terms) {
        return res.status(400).send("All fields are required");
    }
    try {
        const existingUser = yield auth_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already exists" });
        }
        // Create a new user
        const newUser = new auth_model_1.default({ firstName, lastName, email, password, terms });
        // Save the user to the database
        yield newUser.save();
        res.status(201).send("User created successfully");
    }
    catch (error) {
        if (error.code === 11000) {
            // Duplicate email error
            // res.status(400).send("Email already exists");
            res.status(400).json({ message: "Email already exists" });
        }
        else {
            res.status(500).send("Internal server error");
        }
    }
});
exports.userRegistration = userRegistration;
// Login User
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate the request body
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    try {
        // Find the user by email
        const user = yield auth_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }
        // Compare the password
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password");
        }
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: (0, generateToken_1.default)(user._id),
            message: "Logged in successfully",
        });
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
});
exports.userLogin = userLogin;
