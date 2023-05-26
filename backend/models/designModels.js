const { kMaxLength } = require("buffer")

const mongoose=require("mongoose")
const designSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter design name"]
    },

    description:{
        type:String,
        required:[true,"Please enter design description"]
    },

    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"Price can't exceed 8 figures "]
    },

    stock:{
        type:Number,
        default:0
    },

    ratings:
    {
        type:Number,
        default:0
    },

    images:
    [{
        p_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],

    catagory:
    {
        type:String,
        required:true
    },

    reviews:
    [{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
        name:
        {
            type:String,
            required:true
        },

        rating:
        {
            type:Number,
            required:true
        },

        comment:
        {
            type:String,
            required:true
        }
    }],

    noOfReviews:{
        type:Number,
        // required:true
        default:0
    },

    createdAt:
    {
        type:Date,
        default:Date.now
    },  
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
})

module.exports= mongoose.model("Design",designSchema)