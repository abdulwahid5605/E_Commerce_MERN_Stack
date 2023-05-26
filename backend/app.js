const design=require("./designRoutes/designRoutes")
const user=require("./designRoutes/userRoutes")

const order=require("./designRoutes/orderRoutes")

const express=require("express")
const errorMiddleware=require("./middleware/error")
const cookieparser=require("cookie-parser")

const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")

const app=express()
app.use(express.json())
app.use(cookieparser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.use("/api/v1",design)
app.use("/api/v1",user)

app.use("/api/v1",order)

app.use(errorMiddleware)
module.exports=app