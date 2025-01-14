import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state, action) {
      state.singleProject = {};
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.singleProject = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.singleProject = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const getAllProjects = (id) => async (dispatch) => {
  debugger;
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      `https://my-protfolio-ghj2.onrender.com/api/v1/projects/getsingle/${id}`,
      { withCredentials: true }
    );
    dispatch(
      projectSlice.actions.getAllProjectsSuccess(response.data.projects)
    );
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

export default projectSlice.reducer;
