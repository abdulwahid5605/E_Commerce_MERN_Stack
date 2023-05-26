const Design=require("../models/designModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError=require("../middleware/catchAsyncErrors")
// const User=require("../models/userModels")

const { query } = require("express")
const ApiFeatures = require("../utils/apifeaatures")
exports.getDesignDetails= catchAsyncError( async(req,res,next)=>
{
    const design= await Design.findById(req.params.id)
    if(!design)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        success:true,
        design
    })
})
exports.createDesign= catchAsyncError(async(req,res,next)=>
{
    req.body.user=req.user.id
    const design=await Design.create(req.body)
    res.status(201).json
    ({
        success:true,
        design
    })
}) 
exports.getAllDesigns= catchAsyncError(async(req,res,next)=>
{
    const resultPerPage=8

    const productsCount=await Design.countDocuments()

    const apiFeatures=new ApiFeatures(Design.find(),req.query)
    .search()
    .filter()
    .pagination()
    

    let design=await apiFeatures.query

    // let filteredDesignsCount=design.length

    // apiFeatures.pagination(resultPerPage)

    // design= await apiFeatures.query

    
    res.status(200).json({
        success:true,
        design ,
        productsCount,
        resultPerPage,
        // filteredDesignsCount,
    })
}) 
exports.updateDesign= catchAsyncError(async(req,res,next)=>
{
    let design=await Design.findById(req.params.id)
    if(!design)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    design=await Design.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        seccess:true,
        message:"product is updated successfully"
    })
}) 
exports.deleteDesign= catchAsyncError(async (req,res,next)=>
{
    const design= await Design.findById(req.params.id)
    if(!design)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    await design.remove;
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
}) 

// create new review or update review
exports.createProductReview = catchAsyncError(async(req,res,next)=>
{
    // destructuring: It is the assigning of the value to multiple variable and the variables are passed in objects
    const {rating,comment,productId}=req.body
    const review=
    {
        // jis user na review diya uski id save krlo
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating), //rating should be number
        comment,
    }

    // now we have to find out the product jiska review dhundna ha 
    const product=await Design.findById(productId)

    // rev.user:pehlay se stored id ha ye
    // rev.user._id:abhi ki id ha user ki
    const isReviewed=product.reviews.find((rev)=>rev.user.toString()===rev.user._id.toString())

    // agr kisi nay pehlay se hi review diya hova to kiya krna ha aur agr nahi diya hua to kiya krna ha 
    if(isReviewed)
    {
        product.reviews.forEach((rev)=>
        {
            if(rev.user.toString()===rev.user._id.toString())
            (rev.rating=rating ),//ye rating upr se aye ha wo purani wali me overwrite kr rahy
            (rev.comment=comment)
        })
    }
    else
    {
        // we have made a "reviews" schema in designmodels
        product.reviews.push(review) //simply review ko push kr rahay han
        product.noOfReviews=product.reviews.length
    }
    // now setting the product "ratings(schema)"
    // here we are setting up the average ratings of a product
    // ratings=4
    // 
    let avg=0;
    product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    product.ratings=avg/product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
})

// get all reviews of a product
exports.getProductReview=catchAsyncError(async(req,res,next)=>
{
    const product=await Design.findById(req.query.id)

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

// Delete reviews
// deleting review means there should be an update in ratings section because it will be decreased
exports.deleteReview=catchAsyncError(async(req,res,next)=>
{
    const product=await Design.findById(req.query.productId)

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }

    // how to delete
    // review consist of the "reviews" that we need while rest of others will bw deleted
    // rev._id: it is the id of the review schema or model
    // the below fuction will return all the product that we do not need and we will delete them all
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString())

    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    const ratings=avg/reviews.length

    const noOfReviews=reviews.length

    // passing id, giving data that need to be updated like reviews, ratings, noOfReviews
    await Design.findByIdAndUpdate(req.query.productId,{reviews,ratings,noOfReviews},
        {new:true,
        runValidators:true,useFindAndModify:false})

    res.status(200).json({
        success:true,
    })
})