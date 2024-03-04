// configureStore.js

import { combineReducers, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userSlice from "./features/userSlice";
import bookingSlice from "./features/bookingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  booking: bookingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let persistor = persistStore(store);

export { store, persistor };
