import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupFormReducer from "../reducers/signupReducer";
import loginFormReducer from "../reducers/loginReducer";
const persistConfig = {
    key: "signinData",
    storage: storage,
    blacklist: [],
  };
  const rootReducer = combineReducers({
    loginForm:loginFormReducer,
    signupForm: signupFormReducer,
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({ reducer: persistedReducer });
  export const persistor = persistStore(store);
  
  export default store;