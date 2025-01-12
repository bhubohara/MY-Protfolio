import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    // Forgot Password
    forgotPasswordRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    // Reset Password
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Clear Errors
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Forgot Password Action
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "https://my-protfolio-ghj2.onrender.com/api/v1/user/forgote/password",
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.message)
    );
  } catch (error) {
    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordFailed(
        error.response.data.message || "Something went wrong"
      )
    );
  }
};

// Reset Password Action
export const resetPassword =
  ({ token, password, confirmPassword }) =>
  async (dispatch) => {
    debugger;

    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());

    try {
      debugger;
      const response = await axios.put(
        `https://my-protfolio-ghj2.onrender.com/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Reset Password Success Response:", response.data);

      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordSuccess(
          response?.data?.message
        )
      );
    } catch (error) {
      console.error(
        "Reset Password Error:",
        error.response ? error.response.data : error.message
      );

      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordFailed(
          error.response?.data?.message || "Something went wrong"
        )
      );
    }
  };

// Clear All Errors Action
export const clearAllForgotPasswordErrors = () => (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
};

export default forgotResetPasswordSlice.reducer;
