import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    objectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
      required: true
    },
    object_name: {
      type: String,
      required: true,
    },
    creator_userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },
    object_size: {
      type: Number,
      required: true,
    },
    object_type: {
      type: String,
      required: true,
    },
    object_url: {
      type: String,
      required: true,
    },
    object_key: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);


export default mongoose.model("Versioning", versionSchema);