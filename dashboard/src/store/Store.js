import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice.js";
import forgotResetPasswordReducer from "./slice/forgotResetpassSlic.js";
import messageReducer from "./slice/messageSlice.js";
import timelineReducer from "./slice/timelineSlice.js";
import skillReducer from "./slice/addSkillSlice.js";
import softwareapplicationReducer from "./slice/softwareApplicationSlice.js";
import projectReducer from "./slice/projectSlice.js";
import contactReducer from "./slice/addContactslice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    softwareApplications: softwareapplicationReducer,
    project: projectReducer,
    contact: contactReducer,
  },
});
