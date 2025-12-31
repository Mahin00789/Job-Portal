import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    type: String,
    description: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
