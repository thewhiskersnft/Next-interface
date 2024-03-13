import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appLoading: false,
};

export const AppDataSlice = createSlice({
  name: "appDataSlice",
  initialState,
  reducers: {
    setAppLoading: (state, actions) => {
      state.appLoading = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAppLoading } = AppDataSlice.actions;

export default AppDataSlice.reducer;
