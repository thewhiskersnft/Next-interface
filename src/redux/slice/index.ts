import { combineSlices } from "@reduxjs/toolkit";
import { FormDataSlice } from "./formDataSlice";

export const rootReducer = combineSlices(FormDataSlice);
