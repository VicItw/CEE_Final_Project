import express from "express";

import * as groupController from "../controllers/groupController.js";

const router = express.Router();

router.get("/rank", groupController.getGroupRank);
router.post("/createGroup", groupController.createGroup);
router.get("/rankInGroup/:group", groupController.getRankInGroup);

export default router;