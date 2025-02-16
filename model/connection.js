import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/Local_Repo";

mongoose.connect(url);
console.log("SuccessFully Connected MongoDB DataBase");