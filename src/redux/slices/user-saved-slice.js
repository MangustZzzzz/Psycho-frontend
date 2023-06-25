import axios from "../../handlers/axios.js";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserSavedTests = createAsyncThunk("user/getSavedTests", async () => {
  try {
    const { data } = await axios.post("/user/get-saved-tests");
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
});

const initialState = {
  tests: [],
  showingTest: {},
  status: "loading",
};

export const userSavedTests = createSlice({
  name: "savedData",
  initialState,
  reducers: {
    delTest: (state, action) => {
      const indexElem = state.tests.findIndex((elem) => elem.id === action.payload.elemId);
      if (indexElem !== -1) {
        state.tests.splice(indexElem, 1);
      }
    },
  },
  extraReducers: {
    [fetchUserSavedTests.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserSavedTests.fulfilled]: (state, action) => {
      if (action.payload) {
        const sortedTests = action.payload.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          if (a.date > b.date) {
            return -1;
          }
        });
        state.tests = sortedTests;
        state.status = "loaded";
      }
    },
    [fetchUserSavedTests.rejected]: (state, action) => {
      state.status = "error";
      console.log(action);
    },
  },
});

export const { delTest } = userSavedTests.actions;

export default userSavedTests.reducer;
