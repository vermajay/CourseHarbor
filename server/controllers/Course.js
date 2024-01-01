const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
require("dotenv").config();


//create course handler function
exports.createCourse = async(req, res) => {
    try{
        //fetch all data
        let {courseName, courseDescription, whatYouWillLearn, tag, price, category, status, instructions} = req.body;   //category - id

        //get the thumbnail from req.files
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category || !thumbnail){
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


//getAllCourse handler function
exports.getAllCourses = async(req,res) => {
    try{
        //change the below statement incrementally
        const allCourses = await Course.find({});

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
                                                        path : "subSection"
                                                    }
                                                }
                                            )
                                            .populate("ratingAndReviews")
                                            .populate("category")
                                            .exec();

        //more validation
        if(!courseDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: `Course not found with id ${courseId}`
                }
            )
        }

        //return successfull response with course details
        res.status(200).json(
            {
                success: true,
                message: "Course details fetched successfully",
                data: courseDetails
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