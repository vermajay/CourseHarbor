const express = require("express");
const router = express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} = require("../controllers/Profile");
const { auth } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.delete("/deleteProfile", auth, deleteAccount)

module.exports = router;