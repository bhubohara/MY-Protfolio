import { catchAsyncErrors } from "./catchAsyncError.js";
import { ErrorHandler } from "./error.js";
import { User } from "../models/userSchamaModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  // Check if the token is present
  if (!token) {
    return next(new ErrorHandler("User Not Authenticated", 400));
  }
  
  try {
    // Decode the token using the secret key
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Check if the user exists
    const user = await User.findById(decode.id);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    
    // Attach the user object to the request for further use
    req.user = user;
    next();
  } catch (error) {
    // Catch any errors from jwt.verify() such as expired or invalid token
    return next(new ErrorHandler("Invalid or Expired Token", 401));
  }
});
