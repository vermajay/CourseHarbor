const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and initiate the razorpay order, create the order

exports.capturePayment = async(req,res) => {
    //get course id and user id
    const {course_id} = req.body;
    const userId = req.user.id;

    if(!course_id){
        return res.status(400).json(
            {
                success: false,
                message: "All fields are required"
            }
        )
    }

    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.status(400).json(
                {
                    success: false,
                    message: "Could not find the course"
                }
            )
        }

        //make sure that the user has not payed already
        const uid = new mongoose.Types.ObjectId(userId); //convert userId from string to ObjectId format to check
        if(course.studentsEnrolled.includes(uid)){
            return res.status(400).json(
                {
                    success: false,
                    message: "Student is already enrolled"
                }
            )
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }

    //now all the validation is done
    //create order
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        reciept: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId
        }
    }

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        //return response
        res.staus(200).json(
            {
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            }   
        )
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success: false,
                message: "Could not initiate order"
            }
        )
    }
}


//verify signature of razorpay and server

exports.verifySignature = async(req, res) => {

    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];
    
    //Hashed based Message Authentication Code
    //Hmac - hashing algo + secret key

    const shasum = crypto.createHmac("sha256", webhookSecret);            //shasum is a Hmac object
    
    //now convert this Hmac object into string format
    shasum.update(JSON.stringify(req.body));

    //When we run hashing algo on a particular input, then in some cases, the output is called DIGEST
    // It is generally in hexa-decimal format

    const digest = shasum.digest("hex");

    //now we can match the digest and signature
    if(signature === digest){
        console.log("Payment is authorized");

        //now we want userId and courseId to enroll the student in the course
        const {courseId, userId} = req.body;

        try{
            //fulfill the action now

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(courseId, {$push:{studentsEnrolled: userId}}, {new:true});

            if(!enrolledCourse){
                return res.status(500).json(
                    {
                        success: false,
                        message: "Course not found"
                    }
                )
            }

            console.log(enrolledCourse);

            //find the student and add the course to their enrolled courses list
            const enrolledStudent = await User.findByIdAndUpdate(userId, {$push:{courses: courseId}}, {new:true});

            console.log(enrolledStudent);

            //send the mail to the user
            const emailResponse = await mailSender(
                enrolledCourse.email,
                "Congratulations from CourseHarbor!",
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            );

            console.log(emailResponse);

            res.status(200).json(
                {
                    success: true,
                    message: "Signature verified and course added to user's course list"
                }
            )
        }
        catch(error){
            console.log(error);
            res.status(500).json(
                {
                    success: false,
                    message: error.message
                }
            )
        }
    }
    else{
        //signature did not match
        res.status(500).json(
            {
                success: false,
                message: "Invalid request"
            }
        )
    }
                                                                     
}