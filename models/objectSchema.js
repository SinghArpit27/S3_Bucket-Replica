import mongoose from "mongoose";

const objectSchema = new mongoose.Schema({

    object_name: {
        type: String,
        required: true
    },
    object_creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    object_size: {
        type: String,
        required: true
    },
    object_type: {
        type: String,
        required: true
    },
    object_url: {
        type: String,
        required: true
    },
    object_key: {
        type: String,
        required: true
    },
    bucketId: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bucket'}],
        default: [],
    },
    isDeleted: { 
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: false,
    },
    version: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Versioning'
    }

},
{ timestamps: true });

export default mongoose.model("Object", objectSchema);


// Each object has 3 main components--
// 1). content or data
// 2). Unique ID
// 3). descriptive meta data including the objects name, URL, Size


// MetaData:- Amazon S3 object metadata is a set of name-value pairs that you can use to manage information about stored objects. This metadata can be system-defined (automatically assigned by AWS) or user-defined (assigned by the user during the upload process).