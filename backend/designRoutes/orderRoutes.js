const express=require("express")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../designController/orderController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const router=express.Router()

// create order route
router.route("/order/new").post(isAuthenticatedUser,newOrder)

// view single order route
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)

// view my orders(user)
router.route("/orders/me").get(isAuthenticatedUser,myOrders)

// ----admin
// get all products
router.route("/admin/orders").get(isAuthenticatedUser,authorizedRoles("admin"),getAllOrders)


// update order quantity
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder)



module.exports=router