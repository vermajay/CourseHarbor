const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try{
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

        res.status(200).json(
            {
                success: true,
                message: "Section created successfully",
                updatedCourse,
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Internal server error, Error in creating section",
                error: error.message
            }
        )
    }
}

exports.updateSection = async (req, res) => {
    try{
        const {sectionName, sectionId, courseId} = req.body;

        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        res.status(200).json(
            {
                success: true,
                message: "Section updated successfully-> " + updatedSection,
                data: updatedCourse
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in updating section",
                error: error.message
            }
        )
    }
}

exports.deleteSection = async (req, res) => {
    try{
        const {sectionId, courseId} = req.body;

        if(!sectionId || !courseId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const section = await Section.findByIdAndDelete(sectionId);
        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

        //delete sub section
        await SubSection.deleteMany({_id: {$in: section.subSection}})

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {$pull:{courseContent:sectionId}}, {new:true})
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        res.status(200).json(
            {
                success: true,
                message: "Section deleted successfully",
                data: updatedCourseDetails
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in deleting section, Internal Server Error",
                error: error.message
            }
        )
    }
}