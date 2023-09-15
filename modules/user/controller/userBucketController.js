import { responseMessage, responseStatus, statusCode } from '../../../core/constant.js';
import httpResponse from '../../../helper/httpResponse.js';
import { getPlanLimits } from '../../../helper/subscriptionPlans.js';
import Bucket from '../../../models/bucketSchema.js';
import User from '../../../models/userSchema.js';
import Object from '../../../models/objectSchema.js';
import Versioning from '../../../models/objectVersioning.js';


// Create Bucket API
export const createBucket = async (req,res) => {
    try {
        
        const userId = req.userId;
        const userData = await User.findById({ _id: userId});

        if(userData){

          // Get bucket_access emails and Convert it into Ids
          let user_acces = req.body.bucket_access ? req.body.bucket_access.split(',') : [];
          // Find the user IDs for the given email addresses in user_acces
          const userAccesEmail = user_acces.map(email => email.trim());
          const bucketAccessUsers = await User.find({ email: { $in: userAccesEmail } });
          // Extract the IDs from the found users
          const bucketAccessUsersIds = bucketAccessUsers.map(user => user._id);
          // console.log(bucketAccessUsersIds);

          const allAccessUsers = [...bucketAccessUsersIds, userId];
            

          // Assuming you have a field to specify the user's plan
          const bucketName = req.body.bucket_name;
          
          // Get plan limits based on the user's selected plan
          const userPlan = getPlanLimits(userData.user_active_plan);

          const bucketData = await Bucket.findOne({ bucket_name: bucketName });
          if(!bucketData){
            // Check if the number of access users exceeds the plan's limit
            if(user_acces.length < userPlan.maxUsers){
              // console.log("bucketAccessUsersIds: ", bucketAccessUsersIds)

              const newBucket = new Bucket({
                bucket_name: bucketName,
                storage_space: {
                  total_bucket_size: userPlan.maxStorageSpace,
                  bucket_used_size: "0",
                  bucket_remaining_size: userPlan.maxStorageSpace
                },
                bucket_creatorId: userId,
                bucket_type: userData.user_active_plan,
                bucket_access: allAccessUsers,
                auth_users: allAccessUsers.map(accessUserId => ({
                  bucket_access_userId: accessUserId,
                  operation_access: "Read" // Default access type, you can modify this as needed
                }))
              })
              const bucketData = await newBucket.save();
              httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessage.BUCKET_CREATE_SUCCESS, bucketData);
            }else{
              httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.BUCKET_USER_ACCESS_LIMIT);
            }

          }else{
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.BUCKET_NAME_ALREADY_EXIST);
          }
        }else{
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
        }

    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

// Allpw Roles API
export const allowRoles = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await User.findById({ _id: userId });
    
    if (userData) {
      const { bucketId, accessUserId, newOperationAccess } = req.body;
      
      // Find the bucket where the user has access
      const bucket = await Bucket.findById({ _id: bucketId});
      if(bucket){
        const isAssociated = await Bucket.findOne({ "auth_users.bucket_access_userId": accessUserId });
        if (isAssociated) {
          // Check if the requesting user has permission to update operation_access
          if (bucket.bucket_creatorId.toString() === userId) {
            // Update the operation_access field for the specified user using aggregation
            await Bucket.updateOne(
              { _id: bucketId, "auth_users.bucket_access_userId": accessUserId },
              { $set: { "auth_users.$.operation_access": newOperationAccess } }
            );

            httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.OPERATION_ACCESS_UPDATED);
          } else {
            httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessage.UNAUTHORIZED);
          }
        } else {
          httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_BUCKET_ACCESS);
        }
      }else{
        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.BUCKET_NOT_FOUND);
      }
    } else {
      httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
    }
  } catch (error) {
    httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
  }
}

// Upload Object API
export const uploadObject = async (req,res) => {
  try {

    const userId = req.userId;
    const userData = await User.findById({ _id: userId});
    const objectSize = req.file.size // file Size In Bytes
    if(userData){

      // Get plan limits based on the user's selected plan
      const userPlan = getPlanLimits(userData.user_active_plan);

      const bucketData = await Bucket.findById({ _id: req.params.id });
      if(bucketData){

        const remainingBucketSize = parseInt(bucketData.storage_space.bucket_remaining_size);

        if (remainingBucketSize >= objectSize) {
          const userAccess = bucketData.auth_users.find(authUser => authUser.bucket_access_userId.toString() === userId);
          if(userAccess){
            // console.log(userAccess)
            const operationAccess = userAccess.operation_access;
            if(operationAccess === "Read"){
              httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.DONT_HAVE_WRITE_ACCESS);
            }else{

              // Check file size based on the user's plan
              const fileSize = req.file.size;
              if (fileSize < userPlan.minFileSize || fileSize > userPlan.maxFileSize) {

                res.status(400).json({
                  success: 0,
                  message: `File size should be between ${userPlan.minFileSize} and ${userPlan.maxFileSize} bytes`
                })

              } else {

                const fileName = req.file.filename;

                // Use string operations to extract the file extension
                const fileExtension = fileName.split('.').pop();

                // Extract the actual file name without the timestamp
                const parts = fileName.split('-');
                const actualFileName = parts.slice(1).join('-');

                const newObject = new Object({
                  object_name: req.body.object_name,
                  object_url: fileName,
                  object_creatorId: userId,
                  object_size: objectSize,
                  object_type: fileExtension,
                  object_key: actualFileName,
                  bucketId: req.params.id
                });
                const objectData = await newObject.save();


                // update Bucket Document in DB
                // Call a function to update the storage space for the bucket
                await updateStorageSpace(req.params.id, objectSize);

                // Increment the total_objects count in the bucket
                bucketData.total_objects += 1;
                
                // update isEmpty field
                await Bucket.findByIdAndUpdate({ _id: req.params.id}, {$set:{ isEmpty: false }});

                // Save the updated bucket document
                await bucketData.save();



                // Versioning Code
                // Create a new version document
                const newVersion = new Versioning({
                  objectID: objectData._id, // Reference to the uploaded object
                  object_name: objectData.object_name,
                  creator_userId: userId,
                  object_size: objectData.object_size,
                  object_type: objectData.object_type,
                  object_url: objectData.object_url,
                  object_key: objectData.object_key
                });
                const versionData = await newVersion.save();


                // Update Version ID into object for ref
                const updatedObject = await Object.findByIdAndUpdate({ _id: objectData._id }, {$set: { version: versionData._id }});
                
                httpResponse(res, statusCode.CREATED, responseStatus.SUCCESS, responseMessage.OBJECT_UPLOAD_SUCCESS, updatedObject);
              }
            }
          }else{
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_BUCKET_ACCESS);
          }
        }else{
          httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.STORAGE_SPACE_EXCEEDED);
        }
      }else{
        httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.BUCKET_NOT_FOUND);
      }      
    }else{
      httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(error)
    httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
  }
}

// Function to update storage space in the Bucket schema
async function updateStorageSpace(bucketId, objectSize) {
  try {
    const bucket = await Bucket.findById(bucketId);

    if (bucket) {
      const currentBucketSize = parseInt(bucket.storage_space.bucket_used_size);
      const newBucketSize = currentBucketSize + objectSize;
      const remainingBucketSize = parseInt(bucket.storage_space.total_bucket_size) - newBucketSize;

      // Update the bucket's storage space fields
      bucket.storage_space.bucket_used_size = newBucketSize.toString();
      bucket.storage_space.bucket_remaining_size = remainingBucketSize.toString();

      await bucket.save();
    }
  } catch (error) {
    // Handle any errors that may occur during the update
    console.error("Error updating storage space:", error.message);
    httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);

  }
}