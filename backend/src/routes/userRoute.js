import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/:user", userController.getUser); // retrieve score
router.get("/rank", userController.getRank); // for leaderboard
router.post("/updateScore", userController.updateScore); // update score
router.post("/createUser", userController.createUser); // register new user

export default router;
