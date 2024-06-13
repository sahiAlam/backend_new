import { app } from "./app";
import { connectDb } from "./config/database";

// DB Connection
connectDb(process.env.MONGO_URI);

// Server Running
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}...`);
});
