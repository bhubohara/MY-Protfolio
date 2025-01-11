export const generateJwtToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Get the number of days until cookie expires from environment variable
  const cookieExpireDays = Number(process.env.COOKIES_EXPIRE);
  
  // Validate COOKIES_EXPIRE to be a positive number
  if (isNaN(cookieExpireDays) || cookieExpireDays <= 0) {
    return res.status(500).json({
      success: false,
      message: "Invalid value for COOKIES_EXPIRE environment variable.",
    });
  }

  // Calculate expiration date for cookie
  const expires = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);
  
  // Check if expiration date is valid
  if (!(expires instanceof Date) || isNaN(expires)) {
    return res.status(500).json({
      success: false,
      message: "Invalid expiration date for cookies",
    });
  }

  // Set cookie with token and expiration
  res.status(statusCode).cookie("token", token, {
    expires,
    httpOnly: true,        // Prevent JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production",  // Secure cookie only in production (HTTPS)
    SameSite: "None",      // Needed for cross-origin requests
  }).json({
    success: true,
    message,
    user,
  });
};
