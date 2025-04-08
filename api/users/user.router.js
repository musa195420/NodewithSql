const{createUser,getUserByUserId,getUsers,updateUser,deleteUser,login,createUserImage}= require("./user.controller");
const {addUserValdation} = require("../../validation/users/user.validation");
const { refreshTokenHandler, logout } = require("../auth/refresh_token");
const router = require ("express").Router();
const {checkToken} =require("../auth/token_validation");
const upload = require("../middleware/upload"); // adjust path as needed

router.post("/image", upload.single("image"), addUserValdation, createUserImage);
router.post("/", addUserValdation, createUser);
router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUserByUserId);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);
router.post("/token", refreshTokenHandler);
router.post("/logout", logout);
module.exports=router;