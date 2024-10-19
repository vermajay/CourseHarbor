const express = require("express");
const router = express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard} = require("../controllers/Profile");
const { auth, isInstructor } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.delete("/deleteProfile", auth, deleteAccount)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;