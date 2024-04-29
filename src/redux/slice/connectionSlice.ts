import { devEndpoints, mainEndpoints } from "@/constants/connection";
import { isMainnet } from "@/global/hook/getConnectedClusterInfo";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connection: undefined,
  currentEndpoint: isMainnet()
    ? "https://alida-v0xsh4-fast-mainnet.helius-rpc.com"
    : "https://kathe-2vme68-fast-devnet.helius-rpc.com",
  isConnectionLoading: false,
  allDevEndpoints: [...devEndpoints],
  allMainEndpoints: [...mainEndpoints],
  priorityFees: 100000,
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
