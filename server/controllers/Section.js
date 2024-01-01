const Section = require("../models/Section");
const Course = require("../models/Course");

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

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {$push:{courseContent:newSection._id}}, {new:true})
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
                updatedCourseDetails
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in creating section",
                error: error.message
            }
        )
    }
}

exports.updateSection = async (req, res) => {
    try{
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        res.status(200).json(
            {
                success: true,
                message: "Section updated successfully",
                updatedSection
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

        await Section.findByIdAndDelete(sectionId);

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {$pull:{courseContent:sectionId}}, {new:true})
                                                                        .populate({
                                                                            path: "courseContent",
                                                                            populate: {
                                                                                path: "subSection",
                                                                            },
                                                                        })
                                                                        .exec();
        //but do we actually need to delete the entry from course schema? - auto update ho jata h
        

        res.status(200).json(
            {
                success: true,
                message: "Section deleted successfully",
                updatedCourseDetails
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in deleting section",
                error: error.message
            }
        )
    }
}