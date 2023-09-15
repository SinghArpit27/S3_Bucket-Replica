import { allowRole, changePassword, createBucket, forgetPassword, loginInput, registerInput, renewAccessTokenInput, updateProfile, uploadObject} from "./component.js";

export const userPaths = {
  "/userRegister": {
    post: {
      tags: ["Users Auth"],
      summary: "Register User",
      description: "Register user",
      operationId: "RegisterUser",
      requestBody: {
        content: {
          "application/json": {
            schema: registerInput,
          },
        },
      },
      responses: {
        201: {
          description: "User Registered successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
          description: "Unauthorized",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
  "/userLogin": {
    post: {
      tags: ["Users Auth"],
      summary: "Login",
      description: "Login",
      operationId: "Login",
      requestBody: {
        content: {
          "application/json": {
            schema: loginInput,
          },
        },
      },
      responses: {
        200: {
          description: "Login successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
          description: "Unauthorized",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
  "/renewAccessToken": {
    post: {
      tags: ["Users Auth"],
      summary: "Re-new access token",
      description: "re-ne access token",
      operationId: "renewAccessToken",
      requestBody: {
        content: {
          "application/json": {
            schema: renewAccessTokenInput,
          },
        },
      },
      responses: {
        200: {
          description: "got acess token successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
          description: "Unauthorized",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
  "/forgetPassword": {
    post: {
      tags: ["Users Auth"],
      summary: "Forget Password",
      description: "Forget Password",
      operationId: "forgetPassword",
      requestBody: {
        content: {
          "application/json": {
            schema: forgetPassword,
          },
        },
      },
      responses: {
        200: {
          description: "Password forget successfully done",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
          description: "Unauthorized",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
  "/changePassword": {
    post: {
      tags: ["Users Auth"],
      summary: "Change Password",
      description: "Change Password",
      operationId: "ChangePassword",
      requestBody: {
        content: {
          "application/json": {
            schema: changePassword,
          },
        },
      },
      responses: {
        200: {
          description: "Password changed successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
          description: "Unauthorized",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
  "/updateProfile": {
    post: {
      tags: ["Users Auth"],
      summary: "Update Profile",
      description: "Update Profile",
      operationId: "UpdateProfile",
      requestBody: {
        content: {
          "application/json": {
            schema: updateProfile,
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
          description: "Unauthorized",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    }
  },

  "/bucket/create-bucket": {
    post: {
      tags: ["User Bucket"],
      summary: "Create Bucket",
      description: "Create Bucket",
      operationId: "CreateBucket",
      requestBody: {
        content: {
            "application/json": {
            schema: createBucket,
          },
        },
      },
      responses: {
        200: {
          description: "Bucket created successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
            description: "Unauthorized",
            status: {
              type: "string",
            },
            message: {
              type: "string",
            },
        },
      },
    },
  },
  "/bucket/allow-roles": {
    post: {
      tags: ["User Bucket"],
      summary: "Allow Role",
      description: "Allow Role",
      operationId: "AllowRole",
      requestBody: {
        content: {
            "application/json": {
            schema: allowRole,
          },
        },
      },
      responses: {
        200: {
          description: "role set successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
            description: "Unauthorized",
            status: {
              type: "string",
            },
            message: {
              type: "string",
            },
        },
      },
    },
  },
  "/bucket/upload-object/{id}": {
    post: {
      tags: ["User Bucket"],
      summary: "Upload Object",
      description: "Upload Object",
      operationId: "UploadObject",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Bucket Id",
          required: "true",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
            "multipart/form-data": {
            schema: uploadObject,
          },
        },
      },
      responses: {
        200: {
          description: "object uploaded successfully",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        400: {
          description: "Bad Request",
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        401: {
            description: "Unauthorized",
            status: {
              type: "string",
            },
            message: {
              type: "string",
            },
        },
      },
    },
  },


}



