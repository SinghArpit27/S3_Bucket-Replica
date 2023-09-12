import { responseMessage, responseStatus, statusCode } from '../../../core/constant.js';
import httpResponse from '../../../helper/httpResponse.js';
import { getPlanLimits } from '../../../helper/subscriptionPlans.js';
import Bucket from '../../../models/bucketSchema.js';
import User from '../../../models/userSchema.js';



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
          if (bucket.bucket_creatorId.toString() === userId || bucket.bucket_access.includes(userId)) {
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
    if(userData){
      console.log("Upload objects");
      httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.SUCCESS);
    }else{
      httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
    }
    

  } catch (error) {
    httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
  }
}





// export const allowRoles = async (req,res) => {
//   try {

//     const userId = req.userId;
//     const userData = await User.findById({ _id: userId});
//     if(userData){
      
//       const accessUserId = req.params.id;
//       const operationRole = req.body.operation_role;
//       // console.log(accessUserId)

//       const buckets = await Bucket.findOne({ auth_users:[{ bucket_access_userId: accessUserId }] });
//       // const buckets = await Bucket.findOne({$or:[{ bucket_creatorId: userId }, { bucket_access_userId: accessUserId }]});
//       if(buckets){

//         console.log("Bucket Found")
//         httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.SUCCESS, buckets);
        
//       }else{
//         httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.BUCKET_NOT_FOUND);
//       }
//     }else{
//       httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
//     }
//   } catch (error) {
//     httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
//   }
// }