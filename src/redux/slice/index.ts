import { UserDataSlice } from "./userDataSlice";
import { combineReducers, combineSlices } from "@reduxjs/toolkit";
import { FormDataSlice } from "./formDataSlice";
import { AppDataSlice } from "./appDataSlice";
import { ConnectionDataSlice } from "./connectionSlice";
import { TxDataSlice } from "./txDataSlice";

export const rootReducer = combineReducers({
  [FormDataSlice.name]: FormDataSlice.reducer,
  [AppDataSlice.name]: AppDataSlice.reducer,
  [UserDataSlice.name]: UserDataSlice.reducer,
  [ConnectionDataSlice.name]: ConnectionDataSlice.reducer,
  [TxDataSlice.name]: TxDataSlice.reducer,
});
