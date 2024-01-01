const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
require("dotenv").config();

exports.updateProfile = async(req,res) => {
    try{
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        const id = req.user.id;

        if(!contactNumber || !gender){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;

        // const profileDetails = await Profile.findById(profileId);

        // profileDetails.dateOfBirth = dateOfBirth;
        // profileDetails.about = about;
        // profileDetails.contactNumber = contactNumber;
        // profileDetails.gender = gender;

        // await profileDetails.save();

        const profileDetails = await Profile.findByIdAndUpdate(profileId,
                                                                {
                                                                    dateOfBirth:dateOfBirth,
                                                                    about:about,
                                                                    contactNumber:contactNumber,
                                                                    gender:gender
                                                                },
                                                                {new:true});

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();                                                    

        res.status(200).json(
            {
                success: true,
                message: "Profile updated successfully",
                data: updatedUserDetails
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in updating profile",
                error: error.message
            }
        )
    }
}

exports.deleteAccount = async(req,res) => {
    try{
        const userId = req.user.id;

        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }

        //delete user profile(additional details)
        await Profile.findByIdAndDelete(userDetails.additionalDetails);


        //unenroll user from all enrolled courses
        const enrolledCourses = userDetails.courses;
        
        for (let i=0; i < enrolledCourses.length; i++) {
            let enrolledCourseId = enrolledCourses[i];
            await Course.findByIdAndUpdate(enrolledCourseId, {$pull:{studentsEnrolled:userId}}, {new:true});
        }

        //delete user
        await User.findByIdAndDelete(userId);

        res.status(200).json(
            {
                success: true,
                message: "User deleted successfully"
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in deleting user account",
                error: error.message
            }
        )
    }
}

exports.getAllUserDetails = async(req,res) => {
    try{
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        console.log(userDetails);

        res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails
		});
    }
    catch(error){
        return res.status(500).json({
			success: false,
			message: error.message
		});
    }
}

exports.updateDisplayPicture = async(req,res) => {
    try{
        const userId = req.user.id;
        const displayPicture = req.files.displayPicture;

        const image = await uploadFileToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000);
        console.log(image);

        const updatedProfile = await User.findByIdAndUpdate(userId, {image: image.secure_url}, {new:true});

        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getEnrolledCourses = async(req,res) => {
    try{
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate("courses").exec();

        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}