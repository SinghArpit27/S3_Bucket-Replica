import { responseMessage, responseStatus, statusCode } from '../../../core/constant.js';
import httpResponse from '../../../helper/httpResponse.js';
import Bucket from '../../../models/bucketSchema.js';
import User from '../../../models/userSchema.js';




export const createBucket = async (req,res) => {
    try {
        
        const userId = req.userId;
        const userData = await User.findById({ _id: userId});


    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}