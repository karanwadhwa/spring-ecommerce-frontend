import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware,
  });
  let persistor = persistStore(store);

  return { store, persistor };
};
