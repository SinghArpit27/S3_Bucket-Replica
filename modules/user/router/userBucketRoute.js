import express from 'express';
import { createBucket } from '../controller/userBucketController.js';
const route = express.Router();




// Create Bucket Route POST Request
route.post('/createBucket', createBucket);


export default route;