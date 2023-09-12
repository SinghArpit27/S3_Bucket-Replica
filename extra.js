const fileValidation = async (req, file, cb) => {
    const userId = req.userId;
    const userData = await User.findById({ _id: userId });
    
    if (!userData) {
      cb(new Error("User Not Exist"));
    } else {
      const userPlan = getPlanLimits(userData.user_active_plan);
  
      if (userPlan) {
        const planName = userData.user_active_plan;
  
        // Check operation_access in the user's bucket
        const bucketId = req.params.bucketId; // Assuming you have a way to get the bucketId
        const bucket = await Bucket.findById(bucketId);
  
        if (bucket) {
          const userAccess = bucket.auth_users.find(authUser => authUser.bucket_access_userId.toString() === userId);
  
          if (userAccess) {
            const operationAccess = userAccess.operation_access;
  
            if (operationAccess === "Read") {
              // If operation_access is "Read," do not allow file upload
              cb(new Error("Read access user cannot upload files"));
            } else {
              // Check file size based on the user's plan
              const fileSize = file.size;
  
              if (fileSize < userPlan.minFileSize || fileSize > userPlan.maxFileSize) {
                cb(new Error(`File size should be between ${userPlan.minFileSize} and ${userPlan.maxFileSize} bytes`));
              } else {
                cb(null, true);
              }
            }
          } else {
            cb(new Error("User does not have access to this bucket"));
          }
        } else {
          cb(new Error("Bucket not found"));
        }
      } else {
        cb(null, true); // Allow the file upload if no plan information is available
      }
    }
  };
  