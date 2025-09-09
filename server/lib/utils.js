
import jwt from "jsonwebtoken"

//fuction to gen token
export const generateToken = (userId) => {
  return jwt.sign(
    { userId },                 // payload
    process.env.JWT_SECRET,     // secret key
    { expiresIn: "1h" }         // token expiry (best practice)
  );
};