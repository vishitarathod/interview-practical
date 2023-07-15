import express from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import { verifyAccessToken } from "../utils/jwtHelper.js";
const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/list", verifyAccessToken, postController.getAllPost);

router.post("/add-post", verifyAccessToken, postController.addPost);


export default router