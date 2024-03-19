import { createSlice } from "@reduxjs/toolkit";
import { keyPairs } from "../../constants/index";
import { PreviewData } from "../../interfaces/index";

const initialV1Token: PreviewData = {
  "Token Details": {
    "Token Name": "",
    Description: "",
    Symbol: "",
    Supply: "",
    Decimals: "",
  },
};

const initialState = {
  name: "",
  symbol: "",
  description: "",
  supply: 0,
  decimal: 0,
  website: "",
  twitter: "",
  telegram: "",
  discord: "",
  isToggled: false,
  selectedForm: keyPairs.createV1,
  enableExtensions: false,
  transferTax: false,
  interestBearing: false,
  defaultAccountState: false,
  permanentDelegate: false,
  nonTransferable: false,
  fee: "",
  maxFee: "",
  withdrawAuthority: "",
  configAuthority: "",
  rate: "",
  defaultAccountStateOption: "",
  delegate: "",
  previewData: {
    ...initialV1Token,
  },
  fileData: null,
  metaplexFileData: null,
  tokenAddress: "",
  mintAuthority: false,
  freezeAuthority: false,
  mutableMetadata: false,
  mintAmount: 0,
};

export const FormDataSlice = createSlice({
  name: "formDataSlice",
  initialState,
  reducers: {
    setName: (state, actions) => {
      state.name = actions.payload;
    },
    setSymbol: (state, actions) => {
      state.symbol = actions.payload;
    },
    setDescription: (state, actions) => {
      state.description = actions.payload;
    },
    setFileData: (state, actions) => {
      state.fileData = actions.payload;
    },
    setMetaplexFileData: (state, actions) => {
      state.metaplexFileData = actions.payload;
    },
    setSupply: (state, actions) => {
      state.supply = actions.payload;
    },
    setDecimal: (state, actions) => {
      state.decimal = actions.payload;
    },
    setWebsite: (state, actions) => {
      state.website = actions.payload;
    },
    setTwitter: (state, actions) => {
      state.twitter = actions.payload;
    },
    setTelegram: (state, actions) => {
      state.telegram = actions.payload;
    },
    setDiscord: (state, actions) => {
      state.discord = actions.payload;
    },
    setToggled: (state, actions) => {
      state.isToggled = actions.payload;
    },
    setSelectedForm: (state, actions) => {
      state.selectedForm = actions.payload;
    },
    setEnableExtensions: (state, actions) => {
      state.enableExtensions = actions.payload;
    },
    setTransferTax: (state, actions) => {
      state.transferTax = actions.payload;
    },
    setInterestBearing: (state, actions) => {
      state.interestBearing = actions.payload;
    },
    setDefaultAccountState: (state, actions) => {
      state.defaultAccountState = actions.payload;
    },
    setPermanentDelegate: (state, actions) => {
      state.permanentDelegate = actions.payload;
    },
    setNonTransferable: (state, actions) => {
      state.nonTransferable = actions.payload;
    },
    setFee: (state, actions) => {
      state.fee = actions.payload;
    },
    setMaxFee: (state, actions) => {
      state.maxFee = actions.payload;
    },
    setWithdrawAuthority: (state, actions) => {
      state.withdrawAuthority = actions.payload;
    },
    setConfigAuthority: (state, actions) => {
      state.configAuthority = actions.payload;
    },
    setRate: (state, actions) => {
      state.rate = actions.payload;
    },
    setDefaultAccountStateOption: (state, actions) => {
      state.defaultAccountStateOption = actions.payload;
    },
    setDelegate: (state, actions) => {
      state.delegate = actions.payload;
    },
    setPreviewData: (state, actions) => {
      state.previewData = actions.payload;
    },
    setTokenAddress: (state, actions) => {
      // //console.log(actions);
      state.tokenAddress = actions.payload;
    },
    setMintAuthority: (state, actions) => {
      // //console.log(actions);
      state.mintAuthority = actions.payload;
    },
    setFreezeAuthority: (state, actions) => {
      // //console.log(actions);
      state.freezeAuthority = actions.payload;
    },
    setMutableMetadata: (state, actions) => {
      state.mutableMetadata = actions.payload;
    },
    setMintAmount: (state, actions) => {
      state.mintAmount = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setName,
  setSymbol,
  setDescription,
  setConfigAuthority,
  setDecimal,
  setDefaultAccountState,
  setDefaultAccountStateOption,
  setDelegate,
  setDiscord,
  setEnableExtensions,
  setFee,
  setInterestBearing,
  setMaxFee,
  setNonTransferable,
  setPermanentDelegate,
  setFileData,
  setMetaplexFileData,
  setPreviewData,
  setRate,
  setSelectedForm,
  setSupply,
  setTelegram,
  setToggled,
  setTransferTax,
  setTwitter,
  setWebsite,
  setWithdrawAuthority,
  setTokenAddress,
  setMintAuthority,
  setFreezeAuthority,
  setMutableMetadata,
} = FormDataSlice.actions;

export default FormDataSlice.reducer;
