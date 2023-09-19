import express from 'express';
import { allowRoles, createBucket, uploadObject } from '../controller/userBucketController.js';
import { authenticateToken } from '../../../middleware/jwtAuthorization.js';
import upload from '../../../middleware/fileUpload.js';
import { alloRolesValidation, bucketValidation, objectValidation } from '../../../middleware/bucketValidation.js';
import { expressValidationResult } from '../../../helper/validationError.js';
const route = express.Router();

route.use(authenticateToken);



// Create Bucket Route POST Request
route.post('/create-bucket', bucketValidation, expressValidationResult, createBucket);

// Allow Roles Route POST Request
route.post('/allow-roles', alloRolesValidation, expressValidationResult, allowRoles);

// Upload object Route POST Request
route.post('/upload-object/:id', upload.single('object'), objectValidation, expressValidationResult, uploadObject);



export default route;