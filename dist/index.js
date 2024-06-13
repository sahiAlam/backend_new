"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = require("./config/database");
// DB Connection
(0, database_1.connectDb)(process.env.MONGO_URI);
// Server Running
app_1.app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}...`);
});
