const  express =require ('express');
require ("dotenv").config();
const app = express();
const userRouter=require("./api/users/user.router");
app.use(express.json());
app.use("/api/users",userRouter);

app.get("/api",(req,res)=>{
    res.json(
        {
            sucess:1,
            message:"This is rest apis working"
        }
    );
});

app.listen(process.env.APP_PORT,()=>{
    console.log("Server is running at :",process.env.APP_PORT);
});