import express from "express";
import {
  createJob,
  getJobs,
  applyJob,
  getAppliedJobs,
  getRecruiterJobs,
  acceptApplicant,
  rejectApplicant
} from "../controllers/jobController.js";
import { protect, recruiterOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getJobs);

// Candidate
router.get("/applied", protect, getAppliedJobs);
router.post("/:id/apply", protect, applyJob);

// Recruiter
router.get("/recruiter", protect, recruiterOnly, getRecruiterJobs);
router.post("/", protect, recruiterOnly, createJob);

// Accept applicant
router.patch(
  "/:jobId/applicants/:userId/accept",
  protect,
  recruiterOnly,
  acceptApplicant
);
router.patch(
  "/:jobId/applicants/:userId/reject",
  protect,
  recruiterOnly,
  rejectApplicant
);

export default router;
