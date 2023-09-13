import mongoose from "mongoose";

const objectVersioningSchema = new mongoose.Schema(
  {
    objectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
    },

    commits: [
      {
        object_name: {
          type: String,
          required: true,
        },
        commit_userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        object_url: {
          type: String,
          required: true,
        },
        commit_message: {
          type: String,
          required: true,
        },
        committed_time: {
          type: Date,
          default: Date.now,
        },
        version: {
          type: String, //Full semantic version including build (1.5.43.137)
          required: true,
        },
      },
    ],

    current_version: {
      type: String,
      required: true,
    },
    build_number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Versioning", objectVersioningSchema);
