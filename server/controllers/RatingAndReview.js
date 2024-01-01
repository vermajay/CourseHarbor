const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

exports.createRating = async(req,res) => {
    try{
        //fetch the details
        const {courseId, rating, review} = req.body;
        const userId = req.user.id;

        //validation
        if(!courseId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const courseDetails = await Course.findById(courseId);
        if(!courseDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: "Course not found"
                }
            )
        }

        //check if user is enrolled or not, if enrolled, then only the user can give rating and review

        // if(!courseDetails.studentsEnrolled.includes(userId)){       //easy method
        //     return res.status(400).json(
        //         {
        //             success: false,
        //             message: "User not enrolled in the course"
        //         }
        //     )
        // }

        const studentEnrolled = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}}
        });

        if(!studentEnrolled){
            return res.status(400).json(
                {
                    success: false,
                    message: "User not enrolled in the course"
                }
            )
        }

        //make sure that one user can give rating and feview only once
        const alreadyReviewed = await RatingAndReview.findOne({user:userId, course:courseId});
        if(alreadyReviewed){
            return res.status(400).json(
                {
                    success: false,
                    message: "User can give rating and review only once"
                }
            )
        }

        //now we can create rating and review
        const newRatingAndReview = await RatingAndReview.create({
            user: userId,
            rating: rating,
            review: review,
            course: courseId
        })

        //update the course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {$push:{ratingAndReviews:newRatingAndReview._id}}, {new:true});

        console.log(updatedCourse);

        //return response
        res.status(200).json(
            {
                success: true,
                message: "Rating and review created successfully",
                newRatingAndReview
            }
        )

    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in creating rating and review",
                error: error.message
            }
        )
    }
}


exports.getAverageRating = async(req,res) => {
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

        const courseDetails = await Course.findById(courseId);
        if(!courseDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: "Course not found"
                }
            )
        }

        
        //fetch all the ratings and reviews from the course
        // const allRatingAndReviews = courseDetails.ratingAndReviews;

        // let totalRating = 0;

        // for(let i=0; i<allRatingAndReviews.length; i++){
            
        //     const ratingAndReview = await RatingAndReview.findById(allRatingAndReviews[i]);
        //     totalRating += ratingAndReview.rating;
        // }

        // let averageRating = totalRating;
        // if(allRatingAndReviews.length > 0){
        //     averageRating /= allRatingAndReviews.length;
        // }

        // res.status(200).json(
        //     {
        //         success: true,
        //         message: "Average rating fetched successfully",
        //         averageRating
        //     }
        // )

        const result = await RatingAndReview.aggregate(    //this will return an array with average ratings of all the groups created
            [
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId)  //get all those ratings and reviews which belong to this course
                    }
                },
                {
                    $group:{
                        _id: null,                   //this means create a single group of all the matched documents
                        averageOfRating: {
                            $avg: "$rating"          //this will store the average of the "rating" field of a group
                        }                            //in a single array index
                    }
                }
            ]
        )

        //return rating
        if(result.length > 0){
            return res.status(200).json(
                {
                    success: true,
                    averageRating: result[0].averageOfRating  //we created a single group, so we get only 1 value in the returned array
                }
            )
        }

        //if no rating/review exist
        res.status(200).json(
            {
                success: true,
                message: "Average rating is 0, no ratings given till now",
                averageRating: 0
            }
        )

    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in getting average rating",
                error: error.message
            }
        )
    }
}


exports.getAllCourseRating = async(req, res) => {
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

        //fetch the course details and populate

        const options = { sort: [['ratingAndReviews.rating', 'desc' ]] };

        const courseDetails = await Course.findById(courseId)
                                          .populate(
                                            { 
                                                path : "ratingAndReviews",
                                                populate : [
                                                    {
                                                        path: "user",
                                                        select: "firstName lastName email image"
                                                    },
                                                    {
                                                        path: "course",
                                                        select: "courseName"
                                                    }
                                                ],
                                                options
                                            }
                                          )
                                          .exec();
                                                            
        if(!courseDetails){
            return res.status(400).json(
                {
                    success: false,
                    message: "Course not found"
                }
            )
        }

        const allRatingAndReviews = courseDetails.ratingAndReviews;

        //return response
        res.status(200).json(
            {
                success: true,
                message: "All ratings and reviews for the course fetched successfully",
                allRatingAndReviews
            }
        )

    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in fetching all ratings and reviews for the course",
                error: error.message
            }
        )
    }
}


exports.getAllRating = async(req,res) => {
    try{

        const allReviews = await RatingAndReview.find({})
                                                .sort({rating:"desc"})
                                                .populate(
                                                    {
                                                        path: "user",
                                                        select: "firstName lastName email image"
                                                    }
                                                )
                                                .populate(
                                                    {
                                                        path: "course",
                                                        select: "courseName"
                                                    }
                                                )
                                                .exec();

        res.status(200).json(
            {
                success: true,
                message: "All ratings and reviews fetched successfully",
                data: allReviews
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in fetching all ratings and reviews",
                error: error.message
            }
        )
    }
}