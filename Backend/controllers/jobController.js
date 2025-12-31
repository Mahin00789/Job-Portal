import Job from "../models/Job.js";
import User from "../models/User.js";
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants.includes(req.user.id))
      return res.status(400).json({ message: "Already applied" });

    job.applicants.push(req.user.id);
    await job.save();

    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply for job" });
  }
};
export const getAppliedJobs = async (req, res) => {
  const jobs = await Job.find({
    applicants: req.user.id
  });

  res.json(jobs);
};

export const getRecruiterJobs = async (req, res) => {
  const jobs = await Job.find({ postedBy: req.user.id })
    .populate("applicants", "name email");

  res.json(jobs);
};
