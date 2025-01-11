import mongoose from "mongoose";

const softwareSchema = mongoose.Schema({
  name: {
    type: String,
  },

  svgImg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const softwareSchemaApp = mongoose.model(
  "SoftwareAppName",
  softwareSchema
);
