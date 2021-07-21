import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../users/usersSlice";
import companiesReducer from "../companies/companiesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    companies: companiesReducer,
  },
});
