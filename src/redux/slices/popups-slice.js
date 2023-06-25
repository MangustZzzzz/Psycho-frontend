import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bigPopup: {
    state: false,
    title: "Title",
    content: "Content",
  },
  rightAnglePopup: {
    state: false,
    title: "Title",
    content: "Content",
  },
};

export const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    onBigPopup: (state, action) => {
      console.log(action.payload);
      state.bigPopup.state = true;
      state.bigPopup.title = action.payload.title;
      state.bigPopup.content = action.payload.content;
    },
    offBigPopup: (state) => {
      state.bigPopup.state = false;
      state.bigPopup.title = "";
      state.bigPopup.content = "";
    },
    rightAnglePopup: (state) => {
      state.rightAnglePopup = !state.rightAnglePopup;
    },
  },
});

export const { onBigPopup, offBigPopup, rightAnglePopup } = popupsSlice.actions;

export default popupsSlice.reducer;
