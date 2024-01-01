const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseName:{
            type: String,
            required: true
        },
        courseDescription:{
            type: String,
            required: true,
            trim: true
        },
        instructor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        whatYouWillLearn:{
            type: String,
            required: true,
            trim: true
        },
        courseContent:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section"
            }
        ],
        ratingAndReviews:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReview"
            }
        ],
        price:{
            type: Number,
            required: true
        },
        thumbnail:{
            type: String
        },
        tag: {
            type: [String], //array of strings
            required: true
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        studentsEnrolled:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        instructions: {
            type: [String]
        },
        status: {
            type: String,
            enum: ["Draft", "Published"]
        }
    }
);

module.exports = mongoose.model("Course", courseSchema);