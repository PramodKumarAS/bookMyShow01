const bcrypt = require("bcryptjs")
const userModels = require("../Model/users");
const jwt = require("jsonwebtoken");
const emailHelper = require("../Config/emailHelper");
const SALT_ROUNDS = 12

// Collision check
// 90000 - 99999
const otpGenerator = function () {
    return Math.floor((Math.random() * 10000) + 90000);
}

const registerController = async (req,res)=>{

    try {
        
        const userDetails = req.body;
        const userisPresent = await userModels.findOne({ email: req.body.email });

        if(userisPresent){
            return res.status(500).send({
                message:"Email is already taken."
            })
        }
        //const user = await userModels.create(userDetails);
        const user = new userModels(userDetails);
     
        //Generating salt and hashing our password
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(userDetails.password, salt);

        user.password = hashedPassword;
        await user.save();
                
        res.status(200).json({
            success:true,
            message:"Registration is successfull",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false, 
            message:"Internal server error",
        })        

    }

};

const loginController = async (req, res) => {

    try {

        const user = await userModels.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found" });
        }
    
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
        if (!isPasswordValid) {
            return res.status(404).send({ 
                success: false, 
                message: "No user/pass combo found" 
            });
        }
    
        //Generating the token
        const token=jwt.sign(        
            //Extra data stored in JWT (payload)
            {
                userId:user._id,
            },
    
            //SecretKey
            process.env.JWT_SECRET,
    
            //Set the expiry of JWT(options)
            {
                expiresIn   :"1d"
            }
        );
    
        res.status(200).send(
            { 
                success: true, 
                message: "Successfully logged in!",
                token,
                role: user.role
             }
        );    

    } catch (error) {
        res.status(500).send(
            { 
                success: false, 
                message: "Internal Server Error!!",
             }
        );    

    }

};

const getUserController = async (req, res) => {

    try {

        const userId=req.body.userId;

        if (!userId) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong! Try again"
            })
        }

        const user = await userModels.findById(userId).select("-password");
    
        res.status(200).send({
            success:true,
            user
        });  

    } catch (error) {

        res.status(500).send({
            success:false,
            message: "Internal Server Error!!",
        });        

    }

}

const forgetPasswordController = async function (req, res) {
    try {
        /****
                * 1. You can ask for email
                * 2. check if email is present or not
                *  * if email is not present -> send a response to the user(user not found)
                * 3. if email is present -> create basic otp -> and send to the email 
                * 4. also store that otp -> in the userModel
                * 5. to avoid that collison
                *      response -> unique url with id of the user and that will form your reset password 
                * 
                * ***/
        if (req.body.email == undefined) {
            return res.status(401).json({
                status: "failure",
                message: "Please enter the email for forget Password"
            })
        }
        // find the user -> going db -> getting it for the server
        let user = await userModels.findOne({ email: req.body.email });

        // If user is not present, then we can't reset password
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "user not found for this email"
            })
        }

        // got the user -> on your server
        const otp = otpGenerator();

        // Check if this OTP is present in the OTPTable
        // Maybe use a while loop while here


        // Alternative
        // Before saving OTP< check if OTP is present for any user
        // UserModel.findOne({ otp: otp });


        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        // those updates will be send to the db
        await user.save();
        res.status(200).json({
            status: "success",
            message: "otp sent to your email",
        });
        // send the mail to there email -> otp
        await emailHelper(
            "otp.html"
            , user.email,
            {
                name: user.name,
                otp: otp
            });
    } catch (err) {
        console.log({ err })
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
};

const resetPasswordController = async function (req, res) {
    //  -> otp 
    //  newPassword and newConfirmPassword 
    // -> params -> id 
    try {
        let resetDetails = req.body;
        // required fields are there or not 
        if (!resetDetails.password == true || !resetDetails.otp == true) {
            return res.status(401).json({
                status: "failure",
                message: "invalid request"
            })
        }
        // it will serach with the id -> user
        const user = await userModels.findOne({ otp: req.body.otp });
        // if user is not present
        if (user == null) {
            return res.status(404).json({
                status: "failure",
                message: "OTP is wrong"
            })
        }
        // if otp is expired
        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                status: "failure",
                message: "otp expired"
            })
        }

        // If we are till here, that means
        // If we identified the user with the OTP
        // OTP is within validaity period
        // Now we need to update the user with the password

        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword
        // remove the otp from the user
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({
            status: "success",
            message: "password reset successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
};

module.exports = {
    registerController,
    loginController,
    getUserController,
    forgetPasswordController,
    resetPasswordController
};