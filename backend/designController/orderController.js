const Order=require("../models/orderModels")
const Design=require("../models/designModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError=require("../middleware/catchAsyncErrors")


// creating(post) order
exports.newOrder=catchAsyncError(async(req,res,next)=>
{
    // destructuring
    const {shippingInfo,
    orderItems,
    paymentInfo,
    ItemPrice,
    taxPrice,
    shippingPrice,
    totalPrice}=req.body 

    // creating the model
    const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    ItemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    // other then body data
    paidAt:Date.now(),
    user:req.user._id
    })

    res.status(200).json({
        success:true,
        order
    })
})





// get single user api
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>
{

    // populate will look into the user id and will return user name and email instead of user id
    const order=await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if(!order)
    {
        return next(new ErrorHandler("Order not found with this Id",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

// if you wonna view your own order while you are logged in
exports.myOrders=catchAsyncError(async(req,res,next)=>
{

    // find all that orders(find) where user ki id same ha logged in user sa
    const orders=await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })
})


// get all orders -- admin
// in this api there is a function that will show admin total price of the product
exports.getAllOrders=catchAsyncError(async(req,res,next)=>
{

    // find all that orders(find) where user ki id same ha logged in user sa
    const orders=await Order.find()

    let totalAmount=0

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})

// update order status(processing,shipped,delivered) --admin
exports.updateOrder=catchAsyncError(async(req,res,next)=>
{

    const orders=await Order.findById(req.params.id)

    if(orders.orderStatus==="Delivered")
    {
        return next(new ErrorHandler("Produt is already delivered",400))
    }

    // now we have to update the quantity of order. it is obvious that we we will deliver the order then there will be a reduction in the quantity of product

    // we have used forEach because orderItems is an array 
    orders.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })

    orders.orderStatus=req.body.status 

    // orders.deliveredAt=Date.now 
    // but what if we have entered "shipped" in status then deliveredAt will be updated again
    if(req.body.status==="Delivered")
    {
        orders.deliverdAt=Date.now()
    }

    await orders.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity)
{
    const product= await Design.findById(id)
    product.stock-=quantity 
    await product.save({validateBeforeSave:false})
}

exports.deleteOrder=catchAsyncError(async(req,res,next)=>
{

    // find all that orders(find) where user ki id same ha logged in user sa
    const orders=await Order.findById(req.params.id)

    if(!orders)
    {
        return next(new ErrorHandler("order not found with this id",404))
    }

    await orders.remove()


    res.status(200).json({
        success:true,
    })
})
