import Job from "../models/Job.js";

// Create Job (Recruiter)
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id,
      applicants: []
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

// Get All Jobs (Public)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// Apply Job (Candidate)
export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = job.applicants.find(
      (a) => a.user.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    job.applicants.push({
      user: req.user._id,
      status: "applied"
    });

    await job.save();
    res.json({ message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply for job" });
  }
};
export const getAppliedJobs = async (req, res) => {
  const jobs = await Job.find({
    "applicants.user": req.user._id
  }).select("title company applicants");

  const result = jobs.map((job) => {
    const app = job.applicants.find(
      (a) => a.user.toString() === req.user._id.toString()
    );

    return {
      _id: job._id,
      title: job.title,
      company: job.company,
      status: app.status
    };
  });

  res.json(result);
};
// Recruiter Dashboard
export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate("applicants.user", "name email");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
};

// Accept Applicant (Recruiter)
export const acceptApplicant = async (req, res) => {
  try {
    const { jobId, userId } = req.params;

    const job = await Job.findOne({
      _id: jobId,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicant = job.applicants.find(
      (a) => a.user.toString() === userId
    );

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = "accepted";
    await job.save();

    res.json({ message: "Applicant accepted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept applicant" });
  }
};
export const rejectApplicant = async (req, res) => {
  try {
    const { jobId, userId } = req.params;

    const job = await Job.findOne({
      _id: jobId,
      postedBy: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicant = job.applicants.find(
      (a) => a.user.toString() === userId
    );

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = "rejected";
    await job.save();

    res.json({ message: "Applicant rejected" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject applicant" });
  }
};
