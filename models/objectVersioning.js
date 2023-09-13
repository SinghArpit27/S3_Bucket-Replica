import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    objectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
    },
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
    committed_time: {
      type: Date,
      default: Date.now,
    },
    current_version: {
      type: String, // Semantic version
      required: true,
    },
    build_number: {
      type: String, // Build number
      required: true,
    },
  },
  { timestamps: true }
);

const objectVersioningSchema = new mongoose.Schema(
  {
    versions: [versionSchema], // Array to store historical versions
  },
  { timestamps: true }
);

export default mongoose.model("Versioning", objectVersioningSchema);

// import mongoose from "mongoose";

// const objectVersioningSchema = new mongoose.Schema(
//   {
//     objectID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Object",
//     },
//     object_name: {
//       type: String,
//       required: true,
//     },
//     commit_userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     object_url: {
//       type: String,
//       required: true,
//     },
//     committed_time: {
//       type: Date,
//       default: Date.now,
//     },
//     current_version: {
//       type: String, //semantic version
//       required: true,
//     },
//     build_number: {
//       type: String, //build number
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Versioning", objectVersioningSchema);
