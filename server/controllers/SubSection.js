const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try{
        const {sectionId, title, description} = req.body;
        const video = req.files.video;

        if(!sectionId || !title || !description || !video){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create(
            {
                title,
                timeDuration: `${uploadDetails.duration}`,
                description,
                videoUrl: uploadDetails.secure_url
            }
        )

        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId, {$push:{subSection:subSectionDetails._id}}, {new:true})
                                                   .populate("subSection").exec();

        console.log(updatedSectionDetails);

        res.status(200).json(
            {
                success: true,
                message: "SubSection created successfully",
                data: updatedSectionDetails
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in creating SubSection",
                error: error.message
            }
        )
    }
}

exports.updateSubSection = async (req, res) => {
    try{
        const {sectionId, subSectionId, title, description} = req.body;

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if(title !== undefined){
            subSection.title = title;
        }
      
        if(description !== undefined){
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined){
            const video = req.files.video;
            const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

        res.status(200).json(
            {
                success: true,
                message: "SubSection updated successfully",
                data: updatedSection,
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in updating SubSection",
                error: error.message
            }
        )
    }
}

exports.deleteSubSection = async (req, res) => {
    try{
        const {subSectionId, sectionId} = req.body;

        if(!subSectionId || !sectionId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!subSection) {
            return res
              .status(404)
              .json({ success: false, message: "SubSection not found" })
        }

        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId, {$pull:{subSection:subSectionId}}, {new:true})
        .populate("subSection")
        .exec();

        res.status(200).json(
            {
                success: true,
                message: "SubSection deleted successfully",
                data: updatedSectionDetails
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in deleting SubSection",
                error: error.message
            }
        )
    }
}