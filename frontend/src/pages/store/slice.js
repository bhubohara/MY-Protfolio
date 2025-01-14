import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    error: null,
    message: null,
    isUpdate: false,
  },
  reducers: {
    getProfileRequest(state) {
      state.loading = true;
      state.user = {};
      state.error = null;
    },
    getProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    getProfileFailed(state, action) {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    },
  },
});

// Thunk action to fetch user profile
export const getUserForPortfolio = () => async (dispatch) => {
  dispatch(userSlice.actions.getProfileRequest()); // Dispatching request action
  try {
    const { data } = await axios.get(
      "https://my-protfolio-ghj2.onrender.com/api/v1/user/myprofile",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.getProfileSuccess(data.user)); // Dispatching success action with the user data
  } catch (error) {
    // Handling error
    dispatch(
      userSlice.actions.getProfileFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

// Fix: export the reducer correctly

export default userSlice.reducer;
