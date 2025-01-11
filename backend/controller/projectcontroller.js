import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

import { ErrorHandler } from "../middlewares/error.js";

import { Project } from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";
import { softwareSchemaApp } from "../models/softwareApplName.js";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  const imgData = req.files;
  if (!imgData || Object.keys(imgData).length === 0) {
    return next(new ErrorHandler("Project Banner Image Required"));
  }

  const { projectBanner } = imgData;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler("All Fields are required", 400));
  }
  const Banner = projectBanner.tempFilePath.replace(/\\/g, "/");
  const cloudinaryResponse = await cloudinary.uploader.upload(Banner, {
    folder: "Project Banner",
  });
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Failed to upload Project Banner", 500));
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Project Added Successfully",
    project,
  });
});

export const UpdateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
    projectLink: req.body.projectLink,
    gitRepoLink: req.body.gitRepoLink,
  };
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectImageId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectImageId);
    const newProjectImage = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      {
        folder: "PORTFOLIO PROJECT IMAGES",
      }
    );
    newProjectData.projectBanner = {
      public_id: newProjectImage.public_id,
      url: newProjectImage.secure_url,
    };
  }
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Project Updated!",
    project,
  });
});

// export const UpdateProject = catchAsyncErrors(async (req, res, next) => {
//   const findProjectForUpdate = await Project.findById(req.params.id);
//   if (!findProjectForUpdate) {
//     return next(new ErrorHandler("Project not found"));
//   }

//   const newUpdateSoft = {
//     title: req.body.title,
//     description: req.body.description,
//     gitRepoLink: req.body.gitRepoLink,
//     projectLink: req.body.projectLink,
//     technologies: req.body.technologies,
//     stack: req.body.stack,
//     deployed: req.body.deployed,
//   };

//   if (req.files && req.files.projectBanner) {
//     const projectBnr = req.files.projectBanner;

//     //delete the old banner from cloudinary

//     const oldBannerPublicId = findProjectForUpdate.projectBanner.public_id;
//     await cloudinary.uploader.destroy(oldBannerPublicId);

//     //normalize file paths for windows
//     const Banner = projectBnr.tempFilePath.replace(/\\/g, "/");

//     const cloudinaryResponse = await cloudinary.uploader.upload(Banner, {
//       folder: "Project Banner",
//     });
//     if (!cloudinaryResponse || cloudinaryResponse.error) {
//       console.error(
//         "Cloudinary Error:",
//         cloudinaryResponse.error || "Unknown Cloudinary Error"
//       );
//       return next(new ErrorHandler("Failed to upload Project Banner", 500));
//     }
//     newUpdateSoft.projectBnr = {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     };
//   }

//   //update software project

//   const project = await Project.findByIdAndUpdate(
//     req.params.id,
//     newUpdateSoft,
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//     message: " Project Update Successfully",
//     project,
//   });
// });

// export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
//   const projectData = await Project.find();

//   res.status(200).json({
//     success: true,
//     message: "All Project Lists",
//     projectData,
//   });
// });

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  try {
    const projects = await Project.find();
    // Log the fetched data

    res.status(200).json({
      success: true,
      message: "All Project Lists",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects.",
    });
  }
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(_id);
  if (!project) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }
  const projectImageId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectImageId);
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);

    res.status(200).json({
      success: true,
      message: "Project fetch successfully",
      project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Faild to find project ",
      error,
    });
  }
});
