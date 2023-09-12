import multer from 'multer';
import path from 'path';
import User from '../models/userSchema.js';
import { fileURLToPath } from 'url';
import { getPlanLimits } from '../helper/subscriptionPlans.js';


// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Attachments should be Image
const fileUpload = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, '../public/uploads'));
    },

    filename:function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileValidation = async (req, file, cb) => {
    const userData = await User.findById({ _id: req.userId });
    if(!userData){
        cb(new Error("User Not Exist"));
    }else{
        // const userPlan = userData.plan;
        const userPlan = getPlanLimits(userData.user_active_plan)
        if(userPlan){
            
            const planName = getPlanLimits(userData.user_active_plan)
            
        }else{
            cb(null, true);
        }
    }
}
const upload = multer({ storage: fileUpload, fileFilter: fileValidation });


export default upload;