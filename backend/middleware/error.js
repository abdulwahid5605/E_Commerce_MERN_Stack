const ErrorHandler=require("../utils/errorHandler")
module.exports=(err,req,res,next)=>
{
    err.statusCode=err.statusCode||500
    err.message=err.message||"internal server error"
    if(err.name==="CastError")
    {
        const message=`Resource not found. Invalid ${err.path}`
        ErrorHandler()
    }

    if(err.code==11000)
    {
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`
        err=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        // error:err,
        error:err.statusCode,
        message:err.message
    })
}