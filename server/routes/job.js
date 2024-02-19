import express from "express";
import {
    createJob,
    getJobs,
    getJob,
    getUserJobs,
    updateJob,
    deleteJob
} from "../controllers/job.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createJob);
/* READ */
router.get("/", verifyToken, getJobs);
router.get("/:id", verifyToken, getJob);
router.get("/user/:userId", verifyToken, getUserJobs);
/* UPDATE */
router.patch("/:id", verifyToken, updateJob);
/* DELETE */
router.delete("/:id", verifyToken, deleteJob);

export default router;
