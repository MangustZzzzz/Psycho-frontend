import axios from "../../handlers/axios.js";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServiceData = createAsyncThunk("service/data", async () => {
  try {
    const { data } = await axios.post("/started-data");
    console.log("qwe");

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
});

const initialState = {
  methodologies: [],
  status: "default",
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchServiceData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchServiceData.fulfilled]: (state, action) => {
      state.methodologies = action.payload.result;
      state.status = "loaded";
      console.log("loaded");
    },
    [fetchServiceData.rejected]: (state, action) => {
      state.status = "error";
      console.log(action);
    },
  },
});

//export const { setUserSuccess } = userSlice.actions;

export default serviceSlice.reducer;
