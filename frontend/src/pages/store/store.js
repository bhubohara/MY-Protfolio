import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice.js";
import projectReducer from "./project.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});
