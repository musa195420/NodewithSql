const { create,getUserByUserId,getUsers,updateUser,deleteUser,getUserByUserEmail } = require("./user.service");
const { generateAccessToken, generateRefreshToken } = require("../auth/refresh_token");
const { genSaltSync, hashSync,compareSync } = require("bcrypt");
const {sign}=require("jsonwebtoken");
require ("dotenv").config();

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error "+err,
                });  // return here to prevent further code execution
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getUserByUserId:(req,res)=>{
        const id = req.params.id;
        getUserByUserId(id,(err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error "+err,
                });  // return here to prevent further code execution
            }
            if(!results)
            {
                return res.json(
                    {
                        success:0,
                        message:"Record not Found"
                    }
                );
            }
            return res.json({
                success:200,
                data:results
            });
        })
    },
    getUsers:(req,res)=>{
       
        getUsers((err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error "+err,
                });  // return here to prevent further code execution
            }
            if(!results)
            {
                return res.json(
                    {
                        success:0,
                        message:"Record not Found"
                    }
                );
            }
            return res.json({
                success:200,
                data:results
            });
        })
    },

   updateUser:(req,res)=>{
    const data =req.body;
       
        updateUser(data,(err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error "+err,
                });  // return here to prevent further code execution
            }
            if(!results)
            {
                return res.json(
                    {
                        success:0,
                        message:"Record not Found"
                    }
                );
            }
            return res.json({
                success:200,
                data:"User Updated Sucess Fully"
            });
        })
    },
   deleteUser:(req,res)=>{
        const data =req.body;
           
            deleteUser(data,(err,results)=>{
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database Connection Error "+err,
                    });  // return here to prevent further code execution
                }
                if(!results)
                {
                    return res.json(
                        {
                            success:0,
                            message:"Record not Found"
                        }
                    );
                }
                return res.json({
                    success:200,
                    data:"User Deleted SucessFully"
                });
            })
        },

        login: (req, res) => {
            const body = req.body;
            getUserByUserEmail(body.email, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: "Invalid Email or Password"
                    });
                }
        
                const result = compareSync(body.password, results.password);
                if (result) {
                    results.password = undefined;
                    const userPayload = { id: results.id, email: results.email };
        
                    const accessToken = generateAccessToken(userPayload);
                    const refreshToken = generateRefreshToken(userPayload);
        
                    return res.json({
                        success: 200,
                        message: "Login successful",
                        accessToken,
                        refreshToken
                    });
                } else {
                    return res.json({
                        success: 400,
                        message: "Invalid Email or Password"
                    });
                }
            });
        }
   
};
