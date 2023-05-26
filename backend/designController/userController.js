const User=require("../models/userModels")
const catchAsyncError=require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto=require("crypto")

const cloudinary=require("cloudinary")

// register
exports.registerUser=catchAsyncError(async(req,res,next)=>
{

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })

    const {name,email,password}=req.body
    const user=await User.create({
        name,email,password,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    })
    sendToken(user,res,200)
})

// login
exports.loginUser=catchAsyncError(async(req,res,goat)=>{
    const{email,password}=req.body 
    if(!email || !password)
    {
        return goat(new ErrorHandler("Enter Email and Password"))
    }
    const user=await User.findOne({email}).select("+password")
    if(!user)
    {
        return goat(new ErrorHandler("Invalid Email or Password"))
    }
    const isPasswordFound=user.comparePassword(password)
    if(!isPasswordFound)
    {
        return goat(new ErrorHandler("Invalid Email or Password"))
    }
    sendToken(user,res,200)
})

// logout
exports.logoutUser=catchAsyncError(async(req,res,next)=>
{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})

// forgot password
exports.forgotpassword=catchAsyncError(async(req,res,next)=>
{
    const user=await User.findOne({email:req.body.email})
    const resetToken=user.createResetPasswordToken()
    // console.log(resetToken)
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/reset/password/${resetToken}`
    console.log(resetPasswordUrl)
    const message=`your reset password url is:-\n\n${resetPasswordUrl}\n\n if you have not expected this email then ignore it`
    try {
        await sendEmail({
            email:user.email,
            subject:"portfolio password recovery",
            message,
        })
        res.status(200).json
        ({
            success:true,
            message:`Email sent to ${user.email} successfully` 
        })
    } catch (error) {
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))

    }
})
exports.resetpassword=catchAsyncError(async(req,res,next)=>
{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex")

    console.log(resetPasswordToken)

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user)
    {
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400))
    }

    if(req.body.password!==req.body.confirmpassword)
    {
        return next(new ErrorHandler("password does not match",400))
    }

    user.password=req.body.password 

    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined

    await user.save()

    sendToken(user,res,200)

}) 

// get user details
exports.getUserDetails=catchAsyncError(async(req,res,next)=>
{
    const user=await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user,   
    })
})

// update password while you are already logged in
exports.updatePassword=catchAsyncError(async(req,res,next)=>
{
    const user=await User.findById(req.user.id).select("+password")

    const isPasswordFound=user.comparePassword(req.body.oldpassword)
    if(!isPasswordFound)
    {
        return next(new ErrorHandler("Old password is incorrect",400))
    }

    if(req.body.newpassword!==req.body.confirmpassword)
    {
        return next(new ErrorHandler("password does not match",400))
    }

    user.password=req.body.newpassword
    await user.save()
    
    sendToken(user,res,200)
})

// update user profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>
{
    const newUser={
        email:req.body.email,
        name:req.body.name,
    }

    const user=await User.findByIdAndUpdate(req.user.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
    })
})

// admin get all users
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
    const user=await User.find()
    res.status(200).json({
        success:true,
        user,
    })
})

// admin get all users
exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user)
    {
        return next(new ErrorHandler(`User not found with the id:${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        user,
    })
})

// update user profile--Admin
exports.updateUser=catchAsyncError(async(req,res,next)=>
{
    const newUser={
        email:req.body.email,
        name:req.body.name,
        role:req.body.role,
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
    })
})

// delete user --Admin
exports.deleteUser=catchAsyncError(async(req,res,next)=>
{
    const user=await User.findById(req.params.id)
    if(!user)
    {
        return next(new ErrorHandler(`User not found with the id:${req.params.id}`,400))
    }
    await user.remove();
    res.status(200).json({
        success:true,
        message:"user deleted successfully" 
    })
})


