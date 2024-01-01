const express = require("express");
const router = express.Router();

const {contactUs} = require("../controllers/Reach");
const { auth } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Reach routes
// ********************************************************************************************************
router.post("/contact", auth, contactUs)

module.exports = router;