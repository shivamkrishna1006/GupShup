//used before the controller is used basically, to protect routes
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute= async(req,res,next)=>{
    try {
        const token=req.headers.token;
        
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

        const user =await User.findById(decoded.userId).select("-password");
     if(!user) return  res.json({success:false,message:"user not found"})
        
        
     req.user=user ; // now can acess the userdata in the controller
     next();


    } catch (error) {
        console.log(error.message);
        
        res.json({success:false,message:error.message})
    }
}



