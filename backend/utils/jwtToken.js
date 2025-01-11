export const generateJwtToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieExpireDays = Number(process.env.COOKIES_EXPIRE);
  console.log("cookie_expire is", cookieExpireDays);
  const expires = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

  console.log(`Calculated cookie expiration date: ${expires}`);
  console.log(
    `Expires is valid date: ${expires instanceof Date && !isNaN(expires)}`
  );

  if (!(expires instanceof Date) || isNaN(expires)) {
    return res.status(500).json({
      success: false,
      message: "Invalid expiration date for cookies",
    });
  }

  res
    .status(statusCode)
    .cookie("token", token, {
      expires,
      httpOnly: true,
      SameSite:"None",
      secure:true
    })
    .json({
      success: true,
      message,
      user,
    });
};
