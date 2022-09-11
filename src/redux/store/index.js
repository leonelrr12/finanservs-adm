import { configureStore } from "@reduxjs/toolkit";
// import reducers from "../reducers";
import userSlice from "../reducers";

export const store = configureStore({
  reducer: userSlice // reducers
});
