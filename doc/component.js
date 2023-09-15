export const registerInput = {
    type: "object",
    properties: {
      name: {
        type: "string",
        required: "true",
        description: "Name of the user",
      },
      email: {
        type: "string",
        required: "true",
        description: "Email of the user",
      },
      phone: {
        type: "number",
        required: "true",
        description: "Phone Number of the user",
      },
      role: {
        type: "number",
        required: "true",
        description: "Role of the user",
      },
      plan: {
        type: "string",
        required: "true",
        description: "Plan of the user",
      },
    },
  };
  
  export const loginInput = {
    type: "object",
    properties: {
      email: {
        type: "string",
        required: "true",
        description: "Email  of the user",
      },
      password: {
        type: "string",
        required: "true",
        description: "Password of the user",
      },
    },
  };

  export const renewAccessTokenInput = {
    type: "object",
    properties: {
        token: {
        type: "string",
        required: "true",
        description: "Enter refresh token",
      },
    },
  };

  export const forgetPassword = {
    type: "object",
    properties: {
      email: {
        type: "string",
        required: "true",
        description: "Email  of the user",
      },
      password: {
        type: "string",
        required: "true",
        description: "Enter new password",
      },
    },
  };
  
  export const changePassword = {
    type: "object",
    properties: {
      password: {
        type: "string",
        required: "true",
        description: "New Password of the user",
      },
    },
  };
  
  export const updateProfile = {
    type: "object",
    properties: {
      name: {
        type: "string",
        required: "true",
        description: "Name  of the user",
      },
      email: {
        type: "string",
        required: "true",
        description: "Email of the user",
      },
      phone: {
        type: "number",
        required: "true",
        description: "Phone Number of the user",
      },
      plan: {
        type: "string",
        required: "true",
        description: "Plan of the user",
      },
    },
  };


  export const createBucket = {
    type: "object",
    properties: {
        bucket_name: {
        type: "string",
        required: "true",
        description: "Bucket Name",
      },
      bucket_access: {
        type: "array",
        items: {
          type: "string",
        },
        required: "true",
        description: "Enter Email for bucket access",
      },
    },
  };

  export const allowRole = {
    type: "object",
    properties: {
        bucketId: {
        type: "string",
        required: "true",
        description: "Bucket ID",
      },
      accessUserId: {
        type: "string",
        required: "true",
        description: "User Id to set role",
      },
      newOperationAccess: {
        type: "string",
        required: "true",
        description: "operation name",
      },
    },
  };
  
  export const uploadObject = {
    type: "object",
    properties: {
        object_name: {
        type: "string",
        required: "true",
        description: "Enter Object Name",
      },
      object: {
        type: "file",
        required: "true",
        description: "File uploads",
      },

    },
  };