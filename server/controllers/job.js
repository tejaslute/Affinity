import Job from "../models/Job.js";
import User from "../models/User.js";

export const createJob = async (req, res) => {
  try {
    const {
      postedBy,
      jobtitle,
      company,
      jobDescription,
      location,
      salary,
      applicationForm,
    } = req.body;
    const user = await User.findById(postedBy);
    const newJob = new Job({
      postedBy,
      jobtitle,
      company,
      jobDescription,
      location,
      salary,
      applicationForm,
    });
    await newJob.save();

    const job = await Job.find();
    res.status(201).json(job);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const job = await Job.find().sort({ createdAt: -1 }).populate("postedBy");
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("postedBy");
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const job = await Job.find({ postedBy: userId })
      .sort({ createdAt: -1 })
      .populate("postedBy");
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobtitle,
      company,
      jobDescription,
      location,
      salary,
      applicationForm,
    } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { jobtitle, company, jobDescription, location, salary, applicationForm },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
