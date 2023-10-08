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
  sendMessage: {
    state: false,
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

    onRightAnglePopup: (state, action) => {
      state.rightAnglePopup.state = true;
      state.rightAnglePopup.title = action.payload.title;
      state.rightAnglePopup.content = action.payload.content;
    },
    offRightAnglePopup: (state) => {
      state.rightAnglePopup.state = false;
      state.rightAnglePopup.title = "";
      state.rightAnglePopup.content = "";
    },
    onSendMessage: (state, action) => {
      console.log(action.payload);
      state.sendMessage.state = true;
    },
    offSendMessage: (state) => {
      state.sendMessage.state = false;
    },
  },
});

export const { onBigPopup, offBigPopup, rightAnglePopup, onRightAnglePopup, offRightAnglePopup, onSendMessage, offSendMessage } = popupsSlice.actions;

export default popupsSlice.reducer;
