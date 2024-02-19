import express from "express";
import {
    getExperience,
    createExperience,
    getAllExperience,
    updateExperience,
    deleteExperience
} from "../controllers/experience.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getExperience);


/* UPDATE */
router.post("/create/:id", verifyToken, createExperience);
router.patch("/:id", verifyToken, updateExperience);
router.delete("/:id", verifyToken, deleteExperience);
router.get("/getall/:id", verifyToken, getAllExperience);

export default router;
