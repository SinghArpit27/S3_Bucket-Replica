import { responseMessage, responseStatus, statusCode } from '../core/constant.js';
import Versioning from '../models/objectVersioning.js';
import httpResponse from './httpResponse.js';


export const versioning = async (current_version) => {
    try {
        
    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

