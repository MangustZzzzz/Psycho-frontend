import { configureStore } from "@reduxjs/toolkit";
import service from "./slices/service-slice.js";
import session from "./slices/session-slice.js";
import user from "./slices/user-slice.js";
import popups from "./slices/popups-slice.js";
import savedTests from "./slices/user-saved-slice.js";

export const store = configureStore({
  reducer: {
    service,
    session,
    user,
    popups,
    savedTests,
  },
});
