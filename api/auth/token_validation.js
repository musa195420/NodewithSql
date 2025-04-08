const{verify}=require("jsonwebtoken");
require ("dotenv").config();
module.exports ={
    checkToken:(req,res,next)=>{
        let token =req.get("authorization");

        if(token)
        {
            token=token.slice(7); //Bearer 7 word+1space
            verify(token,process.env.KEY,(err,decoded)=>{
                if(err)
                {
                    res.json(
                        {
                           success:0,
                           message:"Invalid Token", 
                        }
                    );
                }else{
                    next();
                }
            });
        }else{
            res.json(
                {
                    success:0,
                    message:"Access denied! unauthorized User"
                }
            )
        }
    }
}