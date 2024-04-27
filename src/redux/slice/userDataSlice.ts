import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalRewards: 0,
};

export const UserDataSlice = createSlice({
  name: "userDataSlice",
  initialState,
  reducers: {
    setTotalRewards: (state, actions) => {
      state.totalRewards = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalRewards } = UserDataSlice.actions;

export default UserDataSlice.reducer;
