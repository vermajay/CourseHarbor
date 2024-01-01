const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    .then(()=>console.log(`Connection with database successful`))
    .catch((error)=>{
        console.error(error);
        console.log("Issue in connecting to database");
        process.exit(1);
    })
};