// create a complete userSchema
const mongoose=require ("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter your name"],
        minLength:[4,"Password should be greater then 6 characters"],
        maxLength:[30,"Passowrd should be less then 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Enter valid email"],
    },
    password:{
        type:String,
        required:[true,"Enter your password"],
        minLength:[6,"Password should be greater then 6 characters"],
        select:false 
    },
    avatar:{
        public_id:
        {
            type:String,
            required:[true,"Enter pulic id"]
        },
        url:
        {
            type:String,
            required:[true,"Enter url"]
        }
    },
    role:
    {
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,
   
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})



userSchema.methods.getjwtToken=function()
{
    return jwt.sign({id:this.id},process.env.SECRET_KEY,
    {expiresIn:process.env.EXPIRE})
}

userSchema.methods.comparePassword=function(password)
{
    return bcrypt.compare(password,this.password)
}

userSchema.methods.createResetPasswordToken=function()
{
    // generating token
    const resettoken=crypto.randomBytes(20).toString("hex")
    // hashing and adding password to user schema
    this.resetPasswordToken=crypto.createHash("sha256").update(resettoken).digest("hex")
    this.resetPasswordExpire=Date.now()+15*60*1000
    return resettoken
}

module.exports=new mongoose.model("User",userSchema)