import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    type: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    company: {
      type: String,
      required: true,
      max: 50
    },
    location: {
      type: String,
      required: true,
      min: 5,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;
