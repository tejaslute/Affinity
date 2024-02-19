import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    applicationForm:{
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
