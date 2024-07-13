import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import claimReducer from "./reducers/claimReducer";
import profileBarReducer from "./reducers/profileBarReducer";
import alertReducer from "./reducers/alertReducer";
import poolReducer from "./reducers/poolReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    claimed: claimReducer,
    profileVisibility: profileBarReducer,
    alert: alertReducer,
    pool: poolReducer,
  },
});
