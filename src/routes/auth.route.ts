import express from "express";
import {
  getHomeRoute,
  userRegistration,
  userLogin,
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/", getHomeRoute);
router.post("/register", userRegistration);
router.post("/login", userLogin);

export default router;
