const app=require("./app")
const dotenv=require("dotenv")

const cloudinary= require("cloudinary")

const { connect } = require("http2")


const connectDatabase = require("./config/database")




dotenv.config({path:"backend/config/config.env"})
connectDatabase()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


process.on("uncaughtException",(err)=>{
    console.log(`Error${err.message}`)
    console.log("Shutting down the server due to uncaughtException error")
    process.exit(1)
})
// console.log(youtube)
const server=app.listen(process.env.PORT,()=>
{
    console.log(`server is working at:http://localhost:${process.env.PORT}`)
})
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection")
    server.close(()=>{
        process.exit(1)
    })
})