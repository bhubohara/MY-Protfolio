import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    contacts: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllContactRequest(state) {
      state.loading = true;
      state.error = null;
      state.contacts = [];
    },
    getAllContactSuccess(state, action) {
      state.contacts = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllContactFailed(state, action) {
      state.contacts = [];
      state.error = action.payload;
      state.loading = false;
    },
    addNewContactRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewContactSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewContactFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteContactRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteContactSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteContactFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateContactRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateContactSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateContactFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetContactState(state) {
      state.error = null;
      state.contacts = [];
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllContact = () => async (dispatch) => {
  dispatch(contactSlice.actions.getAllContactRequest());
  try {
    const response = await axios.get(
      "https://my-protfolio-ghj2.onrender.com/api/v1/contacts/getcontact",
      {
        withCredentials: true,
      }
    );
    dispatch(contactSlice.actions.getAllContactSuccess(response.data.contacts));
    dispatch(contactSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(contactSlice.actions.getAllContactFailed(errorMessage));
  }
};

export const addNewContact = (data) => async (dispatch) => {
  dispatch(contactSlice.actions.addNewContactRequest());
  try {
    const response = await axios.post(
      "https://my-protfolio-ghj2.onrender.com/api/v1/contacts/addContact",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(contactSlice.actions.addNewContactSuccess(response.data.message));
    dispatch(contactSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(contactSlice.actions.addNewContactFailed(errorMessage));
  }
};

export const updateContact = (id, data) => async (dispatch) => {
  dispatch(contactSlice.actions.updateContactRequest());
  try {
    const response = await axios.put(
      `https://my-protfolio-ghj2.onrender.com/api/v1/contacts/update/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(contactSlice.actions.updateContactSuccess(response.data.message));
    dispatch(contactSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(contactSlice.actions.updateContactFailed(errorMessage));
  }
};

export const deleteContact = (id) => async (dispatch) => {
  dispatch(contactSlice.actions.deleteContactRequest());
  try {
    const response = await axios.delete(
      `https://my-protfolio-ghj2.onrender.com/api/v1/contacts/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(contactSlice.actions.deleteContactSuccess(response.data.message));
    dispatch(contactSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(contactSlice.actions.deleteContactFailed(errorMessage));
  }
};

export const clearAllContactErrors = () => (dispatch) => {
  dispatch(contactSlice.actions.clearAllErrors());
};

export const resetContactState = () => (dispatch) => {
  dispatch(contactSlice.actions.resetContactState());
};

export default contactSlice.reducer;
