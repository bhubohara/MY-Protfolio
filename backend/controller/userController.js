import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { ErrorHandler, errorMidleware } from "../middlewares/error.js";
import { User } from "../models/userSchamaModel.js";
import { v2 as cloudinary } from "cloudinary";
import { generateJwtToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume are required!", 400));
  }

  const { avatar, resume } = req.files;

  if (!avatar || !resume) {
    return next(
      new ErrorHandler("Missing required files: avatar and/or resume", 400)
    );
  }

  // Normalize file paths for Windows
  const avatarPath = avatar.tempFilePath.replace(/\\/g, "/");
  const resumePath = resume.tempFilePath.replace(/\\/g, "/");

  // Upload avatar to Cloudinary
  const cloudinaryResponseAvatar = await cloudinary.uploader.upload(
    avatarPath,
    { folder: "Avatar" }
  );
  if (!cloudinaryResponseAvatar || cloudinaryResponseAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseAvatar.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Failed to upload avatar", 500));
  }

  // Upload resume to Cloudinary
  const cloudinaryResponseResume = await cloudinary.uploader.upload(
    resumePath,
    { folder: "Resume" }
  );
  if (!cloudinaryResponseResume || cloudinaryResponseResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseResume.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Failed to upload resume", 500));
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedinURL,
    githubURL,
    resetPasswordToken,
    resetPasswordExpire,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    instagramURL,
    facebookURL,
    twitterURL,
    linkedinURL,
    githubURL,
    resetPasswordToken,
    resetPasswordExpire,
    avatar: {
      public_id: cloudinaryResponseAvatar.public_id,
      url: cloudinaryResponseAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResponseResume.public_id,
      url: cloudinaryResponseResume.secure_url,
    },
  });

  generateJwtToken(user, "User Register Successfully", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email And Password is Required"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  generateJwtToken(user, "Logged In", 200, res);
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Respond with success and the user data
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user,
  });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite:"None",
      secure:true
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUpdateUserDate = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    instagramURL: req.body.instagramURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
    githubURL: req.body.githubURL,
  };

  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);

    // Normalize file paths for Windows
    const avatarPath = avatar.tempFilePath.replace(/\\/g, "/");

    // Upload avatar to Cloudinary
    const cloudinaryResponseAvatar = await cloudinary.uploader.upload(
      avatarPath,
      { folder: "Avatar" }
    );

    newUpdateUserDate.avatar = {
      public_id: cloudinaryResponseAvatar.public_id,
      url: cloudinaryResponseAvatar.secure_url,
    };
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const profileResumeeId = user.resume.public_id;
    await cloudinary.uploader.destroy(profileResumeeId);

    // Normalize file paths for Windows
    const resumePath = resume.tempFilePath.replace(/\\/g, "/");

    // Upload avatar to Cloudinary
    const cloudinaryResponseResume = await cloudinary.uploader.upload(
      resumePath,
      { folder: "Resume" }
    );

    newUpdateUserDate.resume = {
      public_id: cloudinaryResponseResume.public_id,
      url: cloudinaryResponseResume.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUpdateUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "profile updated successfully",
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  debugger;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("All Field Are Required", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect current password", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler(
        "New Password And Confirm New Password Do Not Match",
        400
      )
    );
  }

  if (newPassword === currentPassword) {
    return next(
      new ErrorHandler("Current Password and new password should not same")
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated",
  });
});

export const getUserForProtfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "677e80c579ffa36893dcd17c";

  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const fogotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  const resetPassword = user.getRestPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetPassword}`;

  const message = ` Your reset password token is : -\n\n ${resetPasswordUrl}\n\n if you have not request for this please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Protfolio Password Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

export const passwordReset = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(" Password & Confirm Password do not match"));
  }

  user.password = req.body.confirmPassword;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  generateJwtToken(user, "Reset Password Successfully", 200, res);
});
