import jwt from 'jsonwebtoken';
import userSchemaModel from "../model/userModel.js";
import "../model/connection.js";
import url from 'url';

// import bcrypt from 'bcryptjs';

export var save = async (req, res) => {
    try {
        var userDetails = req.body;

        // Get existing users to generate a unique _id
        var userList = await userSchemaModel.find();
        var l = userList.length;
        var _id = l === 0 ? 1 : userList[l - 1]._id + 1;

        // Generate JWT Token
        let payload = { email: userDetails.email };
        let token = jwt.sign(payload, "qwevfgvqweqe", { expiresIn: "1h" });

        // Construct user details with token
        userDetails = { ...userDetails, _id, token, status: 0, role: "user", info: Date() };

        // Store in MongoDB
        var user = await userSchemaModel.create(userDetails);

        if (user) {
            return res.status(201).json({ message: "User Registered Successfully", user });
        } else {
            return res.status(500).json({ error: "Server Error" });
        }
    } catch (error) {
        console.error("Error in User Registration:", error);
        return res.status(500).json({ error: "Server Error", details: error.message });
    }
};


export var fetch = async (req,res) => {
    const Condidtion_obj = url.parse(req.url,true).query;
     var userlist = await userSchemaModel.find(Condidtion_obj);
     if(userlist.length!=0){
        return res.status(201).json(userlist)
     }else{
        return res.status(500).json(userlist)
     }
}

export var deleteUser = async (req,res) => {
   var id = req.params._id;
   var user = await userSchemaModel.find({_id:id});
   if(user.length!=0){
       let result = await userSchemaModel.deleteMany({_id:id});
       if(result){
           return res.status(201).json({"Message":"User Deleted Successfully"});
       }else{
           return res.status(404).json({error:"Server Error"});
       }
   }else{
       return res.status(500).json({error:"User Not Found"});
   }
};


export var updateUser = async (req,res) =>{
   var user = await userSchemaModel.find({_id:req.body._id});
   if(user.length!=0){
    let id = req.body._id;
    delete req.body._id;
    var result = await userSchemaModel.updateOne({_id:id},{$set:req.body});
    if(result){
        return res.status(201).json({"Message":"User Updated SuccessFully"});
    }else{
        return res.status(404).json({error:"Server error"});
    }
   }else{
    return res.status(500).json({"Message":"User NOt Found"});
   }
}

export var login  = async (req,res) => {
   var userDetails = req.body;
   userDetails = {...userDetails,  "status":1 };
   var user = await userSchemaModel.find(userDetails);
   if(user.length!=0){
       let payload = {"Subject": user[0].email};
       let token = JWT.sign(payload,"qwevfgvqweqe");
       return res.status(201).json({"token":token, "userDetails":user[0]});
   }else{
       return res.status(500).json({error:"Token Error"});
   }
   
};


export const authenticate = async (req, res, next) => {
   const token = req.header("Authorization");
   if (!token) return res.status(401).json({ error: "Access Denied" });

   try {
       const verified = JWT.verify(token, "qwevfgvqweqe");
       const user = await userSchemaModel.findOne({ token });

       if (!user) return res.status(401).json({ error: "Invalid Token" });

       req.user = verified;
       next();
   } catch (error) {
       res.status(400).json({ error: "Invalid Token" });
   }
};

export var logout = async (req, res) => {
   const token = req.header("Authorization");

   try {
       const verified = JWT.verify(token, "qwevfgvqweqe");
       await userSchemaModel.updateOne({ _id: verified._id }, { $set: { token: null } });

       return res.status(200).json({ message: "Logout successful" });
   } catch (error) {
       return res.status(400).json({ error: "Invalid Token" });
   }
};