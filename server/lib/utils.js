
import jwt from "jsonwebtoken"

//fuction to gen token
export const generateToken=async (userId)=>{
const token=jwt.sign({userId},process.env.JWT_SECRET);
return token;
}