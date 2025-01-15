import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdate: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Async Action: Login
export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "https://my-protfolio-ghj2.onrender.com/api/v1/user/Login",
      { email, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : "An unknown error occurred.";
    dispatch(userSlice.actions.loginFailed(errorMessage));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default loginSlice.reducer;
