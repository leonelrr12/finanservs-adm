import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import userSlice from "./user";

const reducer = combineReducers({
    user: userSlice
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
    blacklist: []
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)