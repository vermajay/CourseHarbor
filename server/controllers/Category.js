const Category = require("../models/Category");
const Course = require("../models/Course");

//create a new category
exports.createCategory = async(req, res) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(403).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        const categoryDetails = await Category.create({name:name, description:description});
        console.log(categoryDetails);

        res.status(200).json(
            {
                success: true,
                message: "Category created successfully"
            }
        )
    }
    catch(error){
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}


//get all categories from DB
exports.showAllCategories = async(req, res) => {
    try{
        const allCategories = await Category.find({},{name:true, description:true});

        res.status(200).json(
            {
                success: true,
                message: "All categories fetched successfully",
                allCategories
            }
        )
    }
    catch(error){
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

exports.categoryPageDetails = async(req,res) => {
    try{
        //fetch the details
        const {categoryId} = req.body;

        //validation
        if(!categoryId){
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        //get courses for specified category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        //validate
        if(!selectedCategory){
            return res.status(400).json(
                {
                    success: false,
                    message: "Courses for selected category not found"
                }
            )
        }

        //get courses from different categories also to show in UI
        const differentCategories = await Category.find({_id: {$ne: categoryId}}).populate("courses").exec();   //$ne -> not equal operator

        // get top selling courses also to show in UI
        // const topSellingCourses = await Course.aggregate(
        //     [
        //         {$Course: "$studentsEnrolled"}, {$sortByCount: "$studentsEnrolled"}
        //     ]
        // );

        //return response
        return res.status(200).json(
            {
                success: true,
                data: {
                    selectedCategory,
                    differentCategories,
                    // topSellingCourses
                }
            }
        )
    }
    catch(error){
        console.error(error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in fetching courses",
                error: error.message
            }
        )
    }
}