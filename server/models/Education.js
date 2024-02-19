import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      min: 2,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", EducationSchema);
export default Education;
