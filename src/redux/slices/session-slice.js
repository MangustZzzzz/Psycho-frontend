import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMethodology: {},
  testedPersonData: {},
  analysisResult: [],
  personResponses: [],
  status: "default",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // --- selectedMethodology --- //
    setMethodology: (state, action) => {
      const methodology = { ...action.payload };
      methodology.data = JSON.parse(methodology.data);
      state.selectedMethodology = methodology;
      state.status = "ok";
    },
    /////////////////////////////

    setResponses: (state, action) => {
      state.personResponses = action.payload;
    },

    // --- testedPersonData --- //
    setTestedPersonData: (state, action) => {
      state.testedPersonData = action.payload;
    },
    /////////////////////////////

    // --- analysisResult --- //
    calculate: (state, action) => {
      state.analysisResult = action.payload;
    },
    clearResult: (state) => {
      state.analysisResult = [];
    },
    /////////////////////////////
  },
  extraReducers: {},
});

export const { setMethodology, setTestedPersonData, calculate, clearResult, setResponses } = sessionSlice.actions;

export default sessionSlice.reducer;
