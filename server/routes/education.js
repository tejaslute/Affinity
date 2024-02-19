import express from "express";
import {
    getEducation,
    createEducation,
    getAllEducation,
    updateEducation,
    deleteEducation
} from "../controllers/education.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getEducation);


/* UPDATE */
router.post("/create/:id", verifyToken, createEducation);
router.patch("/:id", verifyToken, updateEducation);
router.delete("/:id", verifyToken, deleteEducation);
router.get("/getall/:id", verifyToken, getAllEducation);

export default router;
