import mongoose from "mongoose";

const bucketSchema = new mongoose.Schema({

    bucket_name: {
        type: String,
        required: true,
        unique: true
    },
    total_objects: {
        type: Number,
        default: 0
    },
    total_bucket_size: {
        type: String,
        required: true 
    },
    bucket_used_size: {
        type: String,
        required: true
    },
    bucket_remaining_size: {
        type: String,
        required: true
    },
    bucket_creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    auth_users: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    },
    // bucket_access: {
    //     type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    //     default: [],
    // },
    bucket_access: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        operation_access: {
            type: String,
            default: "Read"
        }
    },
    bucket_type: {
        type: String,
        required: true
    },
    isEmpty: {
        type: Boolean
    },
    isDeleted: { 
        type: Boolean,
        default: false
    },

},
{ timestamps: true });

export default mongoose.model("Bucket", bucketSchema);

