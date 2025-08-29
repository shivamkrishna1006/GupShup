

import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


//signup
export const signup=async(req,res)=>{

const {fullName,email,password,bio}=req.body;

try {
    if(!fullName || !email || !password || !bio){
        return res.json({success:false,message:"missing details"})   
    }
    
    const user= await User.findOne({email});

    if(user){
        return res.json({success:false,message:"user already exist"})   
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    const newUser= await User.create({
        fullName,email,password:hashedPassword,bio
    });

    const token= generateToken(newUser._id)

    return res.json({success:true,userData:newUser,token,message:"Account Created Successfully"}) 

} catch (error) {
    console.log(error.message)
     return res.json({success:false,message:error.message}) 
}

}

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for missing fields
    if (!email || !password) {
      return res.json({ success: false, message: "Missing email or password" });
    }

    // check if user exists
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(userData._id);

    res.json({ success: true, userData, token, message: "Login successful" });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


// controller to check if the user is authenticates
export const checkAuth = (req,res)=>{
  res.json({success:true,user:req.user});
}

//controller to update user profile

export const updateProfile=async(req,res)=>{
try {
    const {profilePic,bio,fullName} =req.body;

    const userId= req.user._id;
    let updatedUser;
    if (!profilePic) {
  updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
} else {
  const upload = await cloudinary.uploader.upload(profilePic);
  updatedUser = await User.findByIdAndUpdate(userId, {
    profilePic: upload.secure_url,
    bio,
    fullName
  }, { new: true });
}
res.json({ success: true, updatedUser });

} catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
}
}


