const jwt = require("jsonwebtoken");
require("dotenv").env;

//auth
exports.auth = async(req, res, next) => {
    try{
        //extract token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        //if no token found, return response
        if(!token){
            return res.status(401).json(
                {
                    success: false,
                    message: "No token found"
                }
            )
        }

        //validate the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token-> ", decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json(
                {
                    success: false,
                    message: "Token is invalid"
                }
            )
        }
        next();
    }
    catch(error){
        console.log("Error in verifying token-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in verifying token"
            }
        )
    }
}

//isStudent
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json(
                {
                    success: false,
                    message: "You need student role to access this route"
                }
            )
        }
        next();
    }
    catch(error){
        console.log("Error in verifying role-> ", error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in verifying role"
            }
        )
    }
}

//isInstructor
exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json(
                {
                    success: false,
                    message: "You need instructor role to access this route"
                }
            )
        }
        next();
    }
    catch(error){
        console.log("Error in verifying role-> ", error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in verifying role"
            }
        )
    }
}

//isAdmin
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json(
                {
                    success: false,
                    message: "You need admin role to access this route"
                }
            )
        }
        next();
    }
    catch(error){
        console.log("Error in verifying role-> ", error.message);
        res.status(500).json(
            {
                success: false,
                message: "Error in verifying role"
            }
        )
    }
}