import { reducer } from "../reducers";

import {  configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'


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

export const _persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ],
    },
  }),
});

export const persistor = persistStore(store)