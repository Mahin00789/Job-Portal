import express from "express";
import {
  createJob,
  getJobs,
  applyJob,
  getAppliedJobs,
  getRecruiterJobs
} from "../controllers/jobController.js";
import { protect, recruiterOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/applied",protect,getAppliedJobs);
router.get("/recruiter", protect, recruiterOnly, getRecruiterJobs);
router.post("/", protect, recruiterOnly, createJob);
router.post("/:id/apply", protect, applyJob);

export default router;
