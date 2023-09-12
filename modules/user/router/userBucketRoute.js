import express from 'express';
import { allowRoles, createBucket, uploadObject } from '../controller/userBucketController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
const route = express.Router();




// Create Bucket Route POST Request
route.post('/create-bucket', authenticateToken, createBucket);

// Allow Roles Route POST Request
route.post('/allow-roles', authenticateToken, allowRoles);

// Upload object Route POST Request
route.post('/upload-object', authenticateToken, uploadObject);


export default route;