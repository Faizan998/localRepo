import bodyParser from 'body-parser';
import express from 'express';
import userRouter from "./router/userRouter.js";
import dotenv from 'dotenv';


const app = express();
const PORT = 3001

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",userRouter);

app.listen(PORT,()=>{
    console.log(`Server Running On this Link http://localhost:${PORT}`);
});