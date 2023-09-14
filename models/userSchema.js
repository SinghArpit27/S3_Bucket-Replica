import mongoose from 'mongoose';

const allowedPlanNames = ['Basic Plan', 'Intermediate Plan', 'Enterprise Plan'];

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_active_plan: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return allowedPlanNames.includes(value);
            },
            message: 'Invalid plan name. Please choose from Basic Plan, Intermediate Plan, or Enterprise Plan',
        },
    },
    user_role: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},
{ timestamps: true });

export default mongoose.model("User", userSchema);