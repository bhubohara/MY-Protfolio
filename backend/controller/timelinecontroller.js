import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

import { ErrorHandler } from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchemaModel.js";

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  const existingTimelineCheck = await Timeline.findOne({
    title,
  });
  if (existingTimelineCheck) {
    return next(new ErrorHandler("Title aready exists"));
  }

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline added successfully",
    newTimeline,
  });
});

export const getTimeline = catchAsyncErrors(async (req, res, next) => {
  const timeline = await Timeline.find();
  res.status(200).json({
    success: true,
    message: "All Timeline ",
    timeline,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const checkTimeline = await Timeline.findById(id);

  if (!checkTimeline) {
    return next(new ErrorHandler("Timeline is already deleted"));
  }

  const dltTimeline = await Timeline.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: " Timeline delete successfully",
    dltTimeline,
  });
});
