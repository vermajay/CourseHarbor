const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

//send otp
exports.sendOTP = async(req, res) => {
    try{
        //fetch email from req body
        const {email} = req.body;

        //if user already exists, then send it back
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json(
                {
                    success: false,
                    message: "User already exists, go to login"
                }
            )
        }

        //generate otp
        var otp;
        var result = true;

        //make sure that the otp generated is unique
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            result = await OTP.findOne({otp: otp});
        }

        //create an entry for otp
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);
        console.log("Printing otp body-> ",otpBody);

        //return successfull response
        res.status(200).json(
            {
                success: true,
                message: "OTP sent to the user and saved to the DB successfully",
                data: otpBody
            }
        )

    }
    catch(error){
        console.log("Error in sending otp-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in sending otp"
            }
        )
    }
}

//signup
exports.signUp = async(req, res) => {
    try{
        //data fetch from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        //validate the data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json(
                {
                    success: false,
                    message: "User already registered, go to login"
                }
            )
        }

        //match the 2 passwords
        if(password !== confirmPassword){
            return res.status(400).json(
                {
                    success: false,
                    message: "Password and confirmPassword do not match"
                }
            )
        }

        //find most recent otp stored for the user
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        //validate otp
        if(recentOtp.length == 0){
            return res.status(400).json(
                {
                    success: false,
                    message: "OTP not found in database"
                }
            )
        }
        if(otp !== recentOtp.otp){
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid OTP"
                }
            )
        }

        //now OTPs are matched (otp stored in db == otp written by user)

        //HASH the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json(
                {
                    success: false,
                    message: "Error in hashing password"
                }
            )
        }

        //create entry in DB

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });

        const user = await User.create({
            firstName, 
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return successfull response
        res.status(200).json(
            {
                success: true,
                message: "User registered successfully",
                user
            }
        )

    }
    catch(error){
        console.log("Error in registering user-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in registering user"
            }
        )
    }
}


//login
exports.login = async(req,res) => {
    try{
        //fetch data from req body
        const {email, password} = req.body;

        //validate the data
        if(!email || !password){
            return res.status(403).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }
        
        //check if user exists or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json(
                {
                    success: false,
                    message: "User not registered, please signup first"
                }
            )
        }

        //match the password
        if(await bcrypt.compare(password, user.password)){
            //now passwords are matched

            //generate JWT
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            user.token = token;
            user.password = undefined;  //make the password field undefined as we are going to send it in response
                                        //so that hacker can't steal it

            //define options to send in cookie
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), //cookie expires in 3 days (it is in milliseconds)
                httpOnly: true                                //httpOnly means client cannot access the cookie (for security)
            }

            res.cookie("token", token, options).status(200).json(         //sending cookie in response
                {
                    success: true,
                    token,
                    user,
                    message: "User logged in successfully"
                }
            )
        }
        else{
            //passwords do not match
            return res.status(401).json(           //403 - client error forbidden
                {
                    success: false,
                    message: "Password do not match"
                }
            )
        }

    }
    catch(error){
        console.log("Error in logging user-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in logging user"
            }
        )
    }
}

async function sendPasswordChangedEmail(user){
    try{
        const mailResponse = await mailSender(user.email, "Password changed successfully", 
                                            passwordUpdated(user.email, `${user.firstName} ${user.lastName}`));
        console.log("Email sent successfully", mailResponse);
    }
    catch(error){
        console.log("Error while sending mail -> ", error); 
        throw error;
    }
}

//change password
exports.changePassword = async(req, res) => {
    try{
        //get data from req body
        const {oldPassword, newPassword} = req.body;

        //fetch user id from req.user
        const id = req.user.id;

        //validate the data
        if(!oldPassword || !newPassword){
            return res.status(403).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        let user = await User.findById(id);
        
        //check if old password is correct
        if(await bcrypt.compare(oldPassword, user.password)){
            //oldPassword matches the password stored in DB

            //HASH the password
            let hashedPassword;
            try{
                hashedPassword = await bcrypt.hash(newPassword, 10);
            }
            catch(error){
                return res.status(500).json(
                    {
                        success: false,
                        message: "Error in hashing password"
                    }
                )
            }

            //update password in database
            user = await User.findByIdAndUpdate(id, {password: hashedPassword}, {new:true});
            console.log("Updated user-> ", user);

            //send mail to the user that the password is updated
            await sendPasswordChangedEmail(user);

            //return successfull response
            res.status(200).json(
                {
                    success: true,
                    message: "Password changed successfully",
                    user
                }
            )

        }
        else{
            return res.status(401).json(
                {
                    success: false,
                    message: "Password is incorrect"
                }
            )
        }
    }
    catch(error){
        console.log("Error in changing password-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in changing password"
            }
        )
    }
}