import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  searchUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.post("/:id", verifyToken, updateUser);
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.get("/search/:q", verifyToken, searchUser);

export default router;
