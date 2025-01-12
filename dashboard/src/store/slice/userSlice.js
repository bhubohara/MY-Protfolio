import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
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
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.error = action.payload;
    },

    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdate = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdate = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdate = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdate = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdate = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdate = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdate = false;
      state.error.message = null;
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

// Async Action: Get User
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      "https://my-protfolio-ghj2.onrender.com/api/v1/user/me",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.loadUserSuccess(data.user));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : "An unknown error occurred.";
    dispatch(userSlice.actions.loadUserFailed(errorMessage));
  }
};

// Async Action: Logout
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://my-protfolio-ghj2.onrender.com/api/v1/user/Logout",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : "An unknown error occurred.";
    dispatch(userSlice.actions.logoutFailed(errorMessage));
  }
};

// Update password
export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "https://my-protfolio-ghj2.onrender.com/api/v1/user/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An unknown error occurred.";
      dispatch(userSlice.actions.updatePasswordFailed(errorMessage));
    }
  };

// Update profile
export const updateProfile = (newdata) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      "https://my-protfolio-ghj2.onrender.com/api/v1/user/update/profile",
      newdata,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors()); // Corrected
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : "An unknown error occurred.";
    dispatch(userSlice.actions.updateProfileFailed(errorMessage));
  }
};

// Reset profile
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

// Action: Clear Errors
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
