import axios from "../../handlers/axios.js";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk("user/data", async () => {
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.post("/auth/me", token);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
});

const initialState = {
  userData: {
    testedPersons: [],
  },
  theme: "dark",
  status: "default",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setUserData: (state, userData) => {
      state.userData = userData;
      state.status = "auth";
    },
    delUserData: (state) => {
      state.userData = {};
      state.status = "default";
    },
    addNewPerson: (state, action) => {
      if (Object.keys(action.payload).length) {
        state.userData.testedPersons.push(action.payload);
      }
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
        state.status = "auth";
      }
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = "error";
      console.log(action);
    },
  },
});

export const { setUserData, delUserData, setTheme, addNewPerson } = userSlice.actions;

export default userSlice.reducer;
