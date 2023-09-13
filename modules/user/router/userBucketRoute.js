import express from 'express';
import { allowRoles, createBucket, uploadObject } from '../controller/userBucketController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
import upload from '../../../middleware/fileUpload.js';
const route = express.Router();

route.use(authenticateToken);




// Create Bucket Route POST Request
route.post('/create-bucket', createBucket);

// Allow Roles Route POST Request
route.post('/allow-roles', allowRoles);

// Upload object Route POST Request
route.post('/upload-object/:id', upload.single('object'), uploadObject);


export default route;