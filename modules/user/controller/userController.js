import { responseMessage, responseStatus, statusCode } from '../../../core/constant.js';
import httpResponse from '../../../helper/httpResponse.js';
import User from '../../../models/userSchema.js';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../../../middleware/jwtAuthentication.js';
import jwt from 'jsonwebtoken';


// User Registration API
export const registerUser = async (req,res) => {
    try {
        
        const defaultPassword = "Welcome@01";
        const userCredentials = {
            email: req.body.email,
            password: defaultPassword
        }
        const emailData = await User.findOne({ email: req.body.email });
        if(!emailData){
            const phoneData = await User.findOne({ phone: req.body.phone })
            if(!phoneData){
                const spassword = await bcrypt.hash(defaultPassword, 10);
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: spassword,
                    user_active_plan: req.body.plan,
                    user_role: req.body.role,
                    orgName: "Debut Infotech",
                });
                const userData = await newUser.save();
                httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.CREATED, userCredentials);
            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.PHONE_ALREADY_EXIST);
            }
        }else{
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.EMAIL_ALREADY_EXIST);
        }
    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

// User Login API
export const loginUser = async (req,res) => {
    try {

        const userData = await User.findOne({ email: req.body.email });
        if(userData){
            const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
            if(passwordMatch){

                // JWT Authentication logic
                const token = {
                    accessToken: await createAccessToken(userData._id),
                    refreshToken: await createRefreshToken(userData._id)
                }
                httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.LOGIN_SUCCESS, token);

            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.INCORRECT_CREDENTIALS);
            }
        }else{
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.INCORRECT_CREDENTIALS);
        }
    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR);
    }
}

// Re-generate Access Token Token API
export const renewAccessToken = async (req,res) => {
    try {
        
        const refreshToken = req.body.token;
        if (refreshToken) {
            // Verify Refresh Token
            jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, async (err, decoded) => {
                if (!err) {

                    const user = decoded; // The user data decoded from the token
                    const userData = await User.findById({ _id: user._id });
                    // Create New Acces token
                    const accessToken = await createAccessToken(userData._id);
                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.SUCCESS, accessToken);

                } else {
                    // console.log("Not Verified refresh token")
                    httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessage.UNAUTHORIZED);
                }
            });
        }else{
            httpResponse(res, statusCode.UNAUTHORIZED, responseStatus.FAILURE, responseMessage.UNAUTHORIZED);
        }

    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

// Forget password API
export const forgetPassword = async (req,res) => {
    try {

        const userData = await User.findOne({ email: req.body.email });
        if(userData){

            const userCredentials = {
                email: req.body.email,
                password: req.body.password
            }

            const spassword = await bcrypt.hash(req.body.password, 10);
            const updatedData = await User.findByIdAndUpdate({ _id: userData._id }, {$set: { password: spassword }});
            httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.FORGET_PASSWORD_SUCCESS, userCredentials);

        }else{
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
        }

    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

// Change password API
export const changePassword = async (req,res) => {
    try {
        
        const userId = req.userId;
        const newPassword = await bcrypt.hash(req.body.password, 10);

        const userData = await User.findByIdAndUpdate(
            { _id: userId },
            { $set: { password: newPassword }}
        );

        if (!userData) {
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.USER_NOT_FOUND);
        }else{
            httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.PASSWORD_CHANGE_SUCCESS);
        }
    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

// Update User Profile API
export const updateUserProfile = async (req,res) => {
    try {
        const userId = req.userId;
        const checkExistingEmail = await User.findOne( { _id: {$ne: userId}, email: req.body.email } );
        if (!checkExistingEmail) {
            const checkExistingPhone = await User.findOne( { _id: {$ne: userId}, phone: req.body.phone } );
            if(!checkExistingPhone){

                const userData = await User.findByIdAndUpdate(
                    { _id: userId },
                    { $set: { name: req.body.name, email: req.body.email, phone: req.body.phone, user_active_plan: req.body.plan } }
                );
                if (userData) {
                    httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.PROFILE_UPDATE, userData);
                }else{
                    httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.UNAUTHORIZED);
                }

            }else{
                httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.PHONE_ALREADY_EXIST);
            }
        } else {
            httpResponse(res, statusCode.BAD_REQUEST, responseStatus.FAILURE, responseMessage.EMAIL_ALREADY_EXIST);
        }
    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}






// Testing Protected API
export const protectedController = async(req,res) => {
    try {
        
        const userId = req.userId;
        const userData = await User.findById({ _id: userId }).select({ _id: 0 });

        httpResponse(res, statusCode.OK, responseStatus.SUCCESS, responseMessage.SUCCESS, userData);

    } catch (error) {
        httpResponse(res, statusCode.INTERNAL_SERVER_ERROR, responseStatus.FAILURE, responseMessage.INTERNAL_SERVER_ERROR, error.message);
    }
}

