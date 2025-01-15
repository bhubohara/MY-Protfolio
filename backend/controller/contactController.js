import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { contactMeSchema } from "../models/contactSchemaModel.js";
import cloudinary from "cloudinary";

// Add Contact
export const addContact = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.ContactImg) {
    return next(new ErrorHandler("Contact image is required!", 400));
  }

  const { ContactImg } = req.files;
  const { titleName, firstDescription, secondDescription, lastDescription } =
    req.body;

  // Validate required fields
  if (
    !titleName ||
    !firstDescription ||
    !secondDescription ||
    !lastDescription
  ) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  // Upload image to Cloudinary
  const uploadedImage = await cloudinary.uploader.upload(
    ContactImg.tempFilePath,
    {
      folder: "Contact_Images",
    }
  );

  if (!uploadedImage || uploadedImage.error) {
    console.error("Cloudinary Error:", uploadedImage.error || "Unknown Error");
    return next(new ErrorHandler("Failed to upload contact image", 500));
  }

  // Save contact to database
  const contact = await contactMeSchema.create({
    titleName,
    firstDescription,
    secondDescription,
    lastDescription,

    ContactImg: {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Contact added successfully!",
    contact,
  });
});

// Get All Contacts
// Get All Contacts (fetch latest added/updated)
export const getAllContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await contactMeSchema.find().sort({ updatedAt: -1 }); // Sort by updatedAt field
  if (!contacts || contacts.length === 0) {
    return next(new ErrorHandler("No contacts found!", 404));
  }

  res.status(200).json({
    success: true,
    contact: contacts[0], // Send only the latest contact
  });
});

// Update Contact
export const updateContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await contactMeSchema.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found!", 404));
  }

  const { titleName, firstDescription, secondDescription, lastDescription } =
    req.body;

  // Update image if a new one is uploaded
  if (req.files && req.files.ContactImg) {
    const { ContactImg } = req.files;

    // Delete old image from Cloudinary
    if (contact.ContactImg && contact.ContactImg.public_id) {
      await cloudinary.uploader.destroy(contact.ContactImg.public_id);
    }

    // Upload new image
    const uploadedImage = await cloudinary.uploader.upload(
      ContactImg.tempFilePath,
      {
        folder: "Contact_Images",
      }
    );

    contact.ContactImg = {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    };
  }

  // Update other fields
  contact.titleName = titleName || contact.titleName;
  contact.firstDescription = firstDescription || contact.firstDescription;
  contact.secondDescription = secondDescription || contact.secondDescription;
  contact.lastDescription = lastDescription || contact.lastDescription;

  await contact.save();

  res.status(200).json({
    success: true,
    message: "Contact updated successfully!",
    contact,
  });
});

// Delete Contact
export const deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await contactMeSchema.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHandler("Contact not found!", 404));
  }

  // Delete image from Cloudinary
  if (contact.ContactImg && contact.ContactImg.public_id) {
    await cloudinary.uploader.destroy(contact.ContactImg.public_id);
  }

  // Delete contact from database
  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully!",
  });
});
