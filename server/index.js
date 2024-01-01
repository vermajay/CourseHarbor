const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const reachRoutes = require("./routes/Reach")

const {dbConnect} = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cookieParser = require("cookie-parser");

const cors = require("cors");      //so that the backend(PORT:4000) can entertain the requests made by frontend(PORT:3000) on the same local machine

const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;
dotenv.config();

//database connect
dbConnect();

//cloudinary connect
cloudinaryConnect();

//middlewares
app.use(express.json());

app.use(cookieParser());

app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
))

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
))

//mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes); 
app.use("/api/v1/reach", reachRoutes);

//default route
app.get("/", (req,res)=>{
    return res.status(200).json(
        {
            success: true,
            message: "Your server is up and running...."
        }
    )
})

//make the app live on port
app.listen(PORT, ()=>{
    console.log(`App is running at port ${PORT}`);
})