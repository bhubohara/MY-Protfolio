import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

import { ErrorHandler } from "../middlewares/error.js";

import { SkillModel } from "../models/skillModel.js";
import cloudinary from "cloudinary";

export const addSkill = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Skill SVG icon is required!"));
    }
    const { svg } = req.files;
    const { title, proficiency } = req.body;

    if (!title) {
      return next(new ErrorHandler("Title is required"));
    }

    const svgIcon = svg.tempFilePath.replace(/\\/g, "/");

    // Upload icon to Cloudinary
    const cloudinaryResponseSkillsvg = await cloudinary.uploader.upload(
      svgIcon,
      {
        folder: "Skills",
      }
    );

    if (!cloudinaryResponseSkillsvg || cloudinaryResponseSkillsvg.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponseSkillsvg.error || "Unknown Cloudinary Error"
      );
      return next(new ErrorHandler("Failed to upload Icon", 500));
    }

    const skill = await SkillModel.create({
      title,
      proficiency,
      svg: {
        public_id: cloudinaryResponseSkillsvg.public_id,
        url: cloudinaryResponseSkillsvg.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "New Skill Added Successfully",
      skill,
    });
  } catch (error) {
    return next(
      new ErrorHandler("An error occurred while adding the skill", 500)
    );
  }
});

export const getAllSkill = catchAsyncErrors(async (req, res, next) => {
  const skills = await SkillModel.find();
  res.status(200).json({
    sucess: true,
    message: "List of Skills:",
    skills,
  });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await SkillModel.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  const { proficiency, title } = req.body;
  skill = await SkillModel.findByIdAndUpdate(
    id,
    { proficiency, title },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    skill,
  });
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await SkillModel.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }
  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});
