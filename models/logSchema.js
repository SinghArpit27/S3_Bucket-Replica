// Create a MongoDB schema for logging
import mongoose from 'mongoose';
const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    action: String,
    user: String,
    details: Object, // You can store additional information here
});

export default mongoose.model('Log', logSchema);