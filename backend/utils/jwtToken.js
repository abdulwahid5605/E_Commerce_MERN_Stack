const sendToken=(user,res,statusCode)=>
{
    const token=user.getjwtToken()
    const options={
        expires:new Date(Date.now()+process.env.EXPIRE_DAY*24*60*60*1000),
        httpOnly:true 
    }
    res.status(statusCode).cookie("token",token,options).json
    ({
        success:true,
        user,
        token
    })
}
module.exports=sendToken