import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const isClient = typeof window !== "undefined";

let store;
let persistor;
if (isClient) {
  const persistConfig = {
    key: "rootStore",
    version: 1,
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // serializableCheck: {
        //  // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
        serializableCheck: false,
      }),
  });

  persistor = persistStore(store);
} else {
  store = configureStore({
    reducer: rootReducer,
  });
  persistor = persistStore(store);
}

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
