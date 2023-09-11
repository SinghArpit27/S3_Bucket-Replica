
// Response Messages
export const responseMessage = {
    SUCCESS: 'Success',
    CREATED: 'Resource created successfully',
    BAD_REQUEST: 'Bad request',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: "Unauthorized User",
    INTERNAL_SERVER_ERROR: 'Internal server error',

    EMAIL_ALREADY_EXIST: "Email is Already Exist",
    PHONE_ALREADY_EXIST: "Phone is Already Exist",
    INCORRECT_CREDENTIALS: "Incorrect credentials",
    LOGIN_SUCCESS: "Login Successfully",
    USER_NOT_FOUND: "User Not Found",
    FORGET_PASSWORD_SUCCESS: "Forget password successfully",
    PASSWORD_CHANGE_SUCCESS: "Password chnaged successfully",
    PROFILE_UPDATE: "Profile Updated successfully",

    // Testing Messages
    MANUAL_ERR: "ARPIT",
    EMAIL_PHONE_ALREADY_EXIST: "Email or Phone Already Exist",
}


// response Status
export const responseStatus = {
    FAILURE: 0,
    SUCCESS: 1
}


// Status Codes
export const statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401
}