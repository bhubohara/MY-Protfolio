import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { ErrorHandler, errorMidleware } from "../middlewares/error.js";
import { softwareSchemaApp } from "../models/softwareApplName.js";
import cloudinary from "cloudinary";

export const addSoftwareApp = catchAsyncErrors(async (req, res, next) => {
  // Check if file is uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application svg icon is required !", 400)
    );
  }

  // Extract the uploaded file
  const { svgImg } = req.files;
  const { name } = req.body;

  // Validate name
  if (!name) {
    return next(new ErrorHandler("Software name is required ", 400));
  }

  // Handle the file upload directly from the buffer to Cloudinary
  // Cloudinary requires the file in a specific format, so pass the file buffer directly
  const cloudinaryResponseIcon = await cloudinary.uploader.upload(
    svgImg.tempFilePath,
    {
      folder: "Software_Application",
      resource_type: "auto", // Automatically detect the resource type (e.g., image, video, etc.)
    }
  );

  if (!cloudinaryResponseIcon || cloudinaryResponseIcon.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseIcon.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Failed to upload Icon", 500));
  }

  // Save the software application information along with the uploaded icon URL
  const softwareApplications = await softwareSchemaApp.create({
    name,
    svgImg: {
      public_id: cloudinaryResponseIcon.public_id,
      url: cloudinaryResponseIcon.secure_url,
    },
  });

  // Send success response
  res.status(200).json({
    success: true,
    message: "New Software Application Added Successfully",
    softwareApplications,
  });
});

export const UpdatesoftwareApp = catchAsyncErrors(async (req, res, next) => {
  // Find the software application by its ID (assuming ID is passed in the request params)
  const softwareApp = await softwareSchemaApp.findById(req.params.id);

  if (!softwareApp) {
    return next(new ErrorHandler("Software application not found", 404));
  }

  const NewUpdateSoftwareApp = {
    name: req.body.name,
  };

  if (req.files && req.files.svgIcon) {
    const svgImg = req.files.svgIcon;

    // Delete the old icon from Cloudinary
    const oldIconPublicId = softwareApp.svgIcon.public_id;
    await cloudinary.uploader.destroy(oldIconPublicId);

    // Normalize file paths for Windows
    const svgIcon = svgImg.tempFilePath.replace(/\\/g, "/");

    // Upload new icon to Cloudinary
    const cloudinaryResponsesvg = await cloudinary.uploader.upload(svgIcon, {
      folder: "Software_Application",
    });

    NewUpdateSoftwareApp.svgIcon = {
      public_id: cloudinaryResponsesvg.public_id,
      url: cloudinaryResponsesvg.secure_url,
    };
  }

  // Update the software application in the database
  const updatedSoftwareApp = await softwareSchemaApp.findByIdAndUpdate(
    req.params.id,
    NewUpdateSoftwareApp,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Software Application updated successfully",
    updatedSoftwareApp,
  });
});

export const deleteSoftwareApp = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const softwareApp = await softwareSchemaApp.findById(id);
  if (!softwareApp) {
    return next(new ErrorHandler("Software not found,400 "));
  }
  const softwareAppSvgId = await softwareApp.svgImg.public_id;
  await cloudinary.uploader.destroy(softwareAppSvgId);
  await softwareApp.deleteOne();
  res.status(200).json({
    success: true,
    message: "Delete successfully",
    softwareApp,
  });
});

export const getAllSoftwareApp = catchAsyncErrors(async (req, res, next) => {
  const softwareApplications = await softwareSchemaApp.find();

  if (softwareApplications.length === 0) {
    return next(new ErrorHandler("There is no software"));
  }

  res.status(200).json({
    success: true,
    message: "All Software Application list:",
    softwareApplications,
  });
});
