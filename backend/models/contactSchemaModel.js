import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  titleName: {
    type: String,
  },
  firstDescription: {
    type: String,
  },
  secondDescription: {
    type: String,
  },
  lastDescription: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },

  ContactImg: {
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

export const contactMeSchema = mongoose.model("Contact", contactSchema);
