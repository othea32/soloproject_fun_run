import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import FrunReducer from "./features/frunSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    frun: FrunReducer,
  },
});