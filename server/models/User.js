const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim: true
        },
        lastName:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            trim: true
        },
        password:{
            type: String,
            required: true
        },
        accountType:{
            type: String,
            enum: ["Admin", "Instructor", "Student"],
            required: true
        },
        active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Profile",
            required: true
        },
        courses:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        ],
        image:{
            type: String,
            required: true
        },
        courseProgress:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }
        ],
        //these two fields are for reset password
        token:{
            type: String
        },
        resetPasswordExpires:{
            type: Date
        }
    },
    { timestamps: true }      // Add timestamps for when the document is created and last modified
);

module.exports = mongoose.model("User", userSchema);