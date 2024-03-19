import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alltxHistory: {},
  txHistory: [],
};

export const TxDataSlice = createSlice({
  name: "txDataSlice",
  initialState,
  reducers: {
    setAlltxHistory: (state, actions) => {
      state.alltxHistory = actions.payload;
    },
    settxHistory: (state, actions) => {
      state.txHistory = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlltxHistory, settxHistory } = TxDataSlice.actions;

export default TxDataSlice.reducer;
