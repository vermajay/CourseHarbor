const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
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

//it returns the courses data along with their totalDuration and progressPercentage
exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0 //it will store total subsections to be later used to calculate progressPercentage
      
      //traverse all courses
	  for (var i = 0; i < userDetails.courses.length; i++) {
		
		let totalDurationInSeconds = 0
		SubsectionLength = 0

        //calculate totalDuration
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) { //traverse all sections

		  totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)

		  SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length //add the subsection count
		}


        //calculate progressPercentage
		let courseProgress = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		let courseProgressCount = courseProgress?.completedVideos.length //no of completed subsections
		if (SubsectionLength === 0) {userDetails.courses[i].progressPercentage = 100}   //if course has no videos
        else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)

		  userDetails.courses[i].progressPercentage = 
            Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }

exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }
  