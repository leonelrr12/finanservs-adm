import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

// import reducers from "../reducers";
// import userSlice from '../slices/user'
// export const store = configureStore({
//   reducer: userSlice // reducers
// });

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'],
  blacklist: []
}

export const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)