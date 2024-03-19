import { devEndpoints, mainEndpoints } from "@/constants/connection";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connection: undefined,
  currentEndpoint: "https://kathe-2vme68-fast-devnet.helius-rpc.com",
  isConnectionLoading: false,
  allDevEndpoints: [...devEndpoints],
  allMainEndpoints: [...mainEndpoints],
  priorityFees: 1000,
};

export const ConnectionDataSlice = createSlice({
  name: "connectionDataSlice",
  initialState,
  reducers: {
    setConnectionLoading: (state, actions) => {
      state.isConnectionLoading = actions.payload;
    },
    setConnection: (state, actions) => {
      state.connection = actions.payload;
    },
    setCurrentEndpoint: (state, actions) => {
      state.currentEndpoint = actions.payload;
    },
    setAllDevEndpoints: (state, actions) => {
      state.allDevEndpoints = actions.payload;
    },
    setAllMainEndpoints: (state, actions) => {
      state.allMainEndpoints = actions.payload;
    },
    setPriorityFees: (state, actions) => {
      state.priorityFees = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setConnection,
  setConnectionLoading,
  setCurrentEndpoint,
  setAllDevEndpoints,
  setAllMainEndpoints,
  setPriorityFees,
} = ConnectionDataSlice.actions;

export default ConnectionDataSlice.reducer;
