const express=require("express")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const { registerUser, loginUser, logoutUser, forgotpassword, resetpassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUser, deleteUser } = require("../designController/userController")
const router=express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotpassword)

router.route("/password/reset/:token").put(resetpassword)

// user details route
router.route("/me").get(isAuthenticatedUser,getUserDetails)

router.route("/password/update").put(isAuthenticatedUser,updatePassword)

router.route("/me/update").put(isAuthenticatedUser,updateProfile)

router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers)

router.route("/admin/users/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getSingleUser).put(isAuthenticatedUser,authorizedRoles("admin"),updateUser).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUser)    







module.exports=router