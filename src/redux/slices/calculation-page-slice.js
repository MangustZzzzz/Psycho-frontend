import axios from "../../handlers/axios.js";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserSuccess = createAsyncThunk("user/status", async () => {
  try {
    const token = window.localStorage.getItem("token") || "";
    const { data } = await axios.post("/auth/me", token);
    return data;
  } catch (error) {
    return false;
  }
});

const initialState = {
  success: false,
  status: "loading",
};

export const userSlice = createSlice({
  name: "user_success",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserSuccess.pending]: (state) => {
      state.success = false;
      state.status = "loading";
    },
    [fetchUserSuccess.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      console.log(action);
      state.status = "loaded";
    },
    [fetchUserSuccess.rejected]: (state, action) => {
      state.success = false;
      state.status = "error";
      console.log(action);
    },
  },
});

//export const { setUserSuccess } = userSlice.actions;

export default userSlice.reducer;
