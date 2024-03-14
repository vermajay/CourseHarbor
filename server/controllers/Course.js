const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();


//create course handler function
exports.createCourse = async(req, res) => {
    try{
        //fetch all data
        let {courseName, courseDescription, whatYouWillLearn, tag: _tag, price, category, status, instructions: _instructions} =
         req.body;   //category - id

        //get the thumbnail from req.files
        const thumbnail = req.files.thumbnail;

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag.length || !category || !thumbnail || !instructions.length){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        //get instructor id to insert in new course
        const userId = req.user.id;                 //auth middleware added this in req

        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        })
    
        if (!instructorDetails) {
            return res.status(404).json({
            success: false,
            message: "Instructor Details Not Found",
            })
        }

        //check given category is valid or not - if category is selected in UI, then it will always be valid, but if req is sent using postman, we have to check the validity of category
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid category"
                }
            )
        }

        //upload thumbnail image to cloudinary and get the secure_url to store in DB
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create entry for new course
        const newCourse = await Course.create(
            {
                courseName,
                courseDescription,
                instructor: userId,
                whatYouWillLearn,
                price,
                tag,
                thumbnail: thumbnailImage.secure_url,
                category: categoryDetails._id,
                status: status,
                instructions: instructions
            }
        )

        //add the new course to the courses field of the user(instructor)
        await User.findByIdAndUpdate(userId, {$push:{courses:newCourse._id}}, {new:true});

        //add the new cousre to the courses field of the category
        await Category.findByIdAndUpdate(category, {$push:{courses:newCourse._id}}, {new:true});

        //return response
        res.status(200).json(
            {
                success: true,
                message: "Course created successfully",
                data: newCourse
            }
        )
    }
    catch(error){
        console.error(error);
        res.status(500).json(
            {
                success: false,
                message: "Error in creating course",
                error: error.message
            }
        )
    }
}

// Edit Course Details
exports.editCourse = async(req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
    
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnail
          const thumbnailImage = await uploadFileToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        res.json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}

//getAllCourse handler function
exports.getAllCourses = async(req,res) => {
    try{
        const allCourses = await Course.find(
            { status: "Published" },
            {
              courseName: true,
              price: true,
              thumbnail: true,
              instructor: true,
              ratingAndReviews: true,
              studentsEnrolled: true,
            }
          )
            .populate("instructor")
            .exec()

        res.status(200).json(
            {
                success: true,
                message: "Data for all courses fetched successfully",
                data: allCourses
            }
        )
    }
    catch(error){
        console.error(error);
        res.status(500).json(
            {
                success: false,
                message: "Error in fetching courses",
                error: error.message
            }
        )
    }
}

//get single course details
exports.getCourseDetails = async(req,res) => {
    try{
        //fetch the details
        const {courseId} = req.body;
        
        //validation
        if(!courseId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const courseDetails = await Course.findById(courseId)
                                            .populate(
                                                { 
                                                    path : "instructor",
                                                    populate : {
                                                        path : "additionalDetails"
                                                    }
                                                }
                                            )
                                            .populate(
                                                { 
                                                    path : "courseContent",
                                                    populate : { 
                                                        path : "subSection",
                                                        select: "-videoUrl",
                                                    }
                                                }
                                            )
                                            .populate("ratingAndReviews")
                                            .populate("category")
                                            .exec();

        if(!courseDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: `Course not found with id ${courseId}`
                }
            )
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((section) => {
          section.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        //return successfull response with course details
        res.status(200).json(
            {
                success: true,
                message: "Course details fetched successfully",
                data: {courseDetails, totalDuration,}
            }
        )
    }
    catch(error){
        console.error(error);
        res.status(500).json(
            {
                success: false,
                message: "Error in fetching course details",
                error: error.message
            }
        )
    }
}

exports.getFullCourseDetails = async(req,res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        let courseProgressCount = await CourseProgress.findOne({
          courseID: courseId,
          userId: userId,
        })
    
        console.log("courseProgressCount : ", courseProgressCount)
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((section) => {
          section.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          data: {
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
              ? courseProgressCount?.completedVideos
              : [],
          },
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async(req,res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id
    
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
          instructor: instructorId,
        }).sort({ createdAt: -1 })
    
        // Return the instructor's courses
        res.status(200).json({
          success: true,
          data: instructorCourses,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to retrieve instructor courses",
          error: error.message,
        })
      }
}

// Delete the Course
exports.deleteCourse = async(req,res) => {
    try {
        const { courseId } = req.body
    
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
          return res.status(404).json({ message: "Course not found" })
        }
    
        //delete course from instructor's courses
        const instructorId = course.instructor;
        await User.findByIdAndUpdate(instructorId, {
          $pull: { courses: courseId },
        })

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
          await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
          })
        }
    
        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
          // Delete sub-sections of the section
          const section = await Section.findById(sectionId)
          if (section) {
            const subSections = section.subSection;
            for (const subSectionId of subSections) {
              await SubSection.findByIdAndDelete(subSectionId)
            }
          }
    
          // Delete the section
          await Section.findByIdAndDelete(sectionId)
        }
    
        // Delete the course
        await Course.findByIdAndDelete(courseId)
    
        return res.status(200).json({
          success: true,
          message: "Course deleted successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
      }
}