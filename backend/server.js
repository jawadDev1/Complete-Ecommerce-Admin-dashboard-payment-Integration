require('dotenv').config({ path: 'backend/config/config.env' });
const app = require('./app');
const connectToDB = require('./connectToDb');
const { v2 : cloudinary } = require('cloudinary');

// Handling Uncaught Exception
process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the Server due to Uncaught Exception");
    process.exit(1);

})


const PORT = process.env.PORT || 8080;
var server;
// Connect to Data Base
connectToDB(process.env.DB_URL)
    .then(res => { server = app.listen(PORT, () => console.log('Server is running at PORT:' + PORT)) });




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the Server due to Unhandled Promise Rejection");

    server.close(() => {
        process.exit(1);
    });
});


