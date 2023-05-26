const express=require("express")
const {getAllDesigns, createDesign, updateDesign, deleteDesign, getDesignDetails, getProductReview, deleteReview } = require("../designController/designController")
const { createProductReview } = require("../designController/designController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const router=express.Router()


router.route("/designs").get(getAllDesigns)


router.route("/admin/designs/new").post(isAuthenticatedUser,authorizedRoles("admin"),createDesign)
router.route("/admin/designs/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateDesign).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteDesign)
router.route("/designs/:id").get(getDesignDetails)

// review and rating updation route
router.route("/reviews").put(isAuthenticatedUser,createProductReview)

// reviews user aisay bhi dekh sakta ha zaruri nahi login karay uskay liye is waja sa isAuthenticated user nahi lagaya
router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser,deleteReview)

module.exports=router