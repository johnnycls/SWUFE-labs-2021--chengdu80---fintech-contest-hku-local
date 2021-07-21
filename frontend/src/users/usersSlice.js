import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const host = "http://18.163.133.53:5000";
//const host = "http://127.0.0.1:5000";
const initialState = { user: "", watchlist: [] };

export const login = createAsyncThunk(
  "/api/login",
  async (userInfo, thunkAPI) => {
    const response = await axios.post(
      host + "/auth/login",
      JSON.stringify(userInfo)
    );
    return response.data;
  }
);

export const register = createAsyncThunk(
  "api/register",
  async (userInfo, thunkAPI) => {
    const response = await axios.post(
      host + "/auth/register",
      JSON.stringify(userInfo)
    );
    return response.data;
  }
);

export const getWatchlist = createAsyncThunk(
  "/corporation/watch_list",
  async (userInfo, thunkAPI) => {
    const response = await axios.post(
      host + "/corporation/watch_list",
      JSON.stringify(userInfo)
    );
    return response.data;
  }
);

export const putWatchlist = createAsyncThunk(
  "/corporation/watch_add",
  async (userInfo, thunkAPI) => {
    const response = await axios.post(
      host + "/corporation/watch_add",
      userInfo
    );
    return response.data;
  }
);

export const deleteWatchlist = createAsyncThunk(
  "/corporation/watch_del",
  async (userInfo, thunkAPI) => {
    const response = await axios.post(
      host + "/corporation/watch_del",
      userInfo
    );
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state, action) {
      state.user = "";
      state.watchlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.res !== -1) {
        state.user = action.meta.arg.username;
      }
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.res !== -1) {
        state.user = action.meta.arg.username;
      }
    });
    builder.addCase(putWatchlist.fulfilled, (state, action) => {
      state.watchlist.push(action.payload.data);
    });
    builder.addCase(getWatchlist.fulfilled, (state, action) => {
      state.watchlist = action.payload.data;
    });
  },
});

export const { logout } = usersSlice.actions;

export const selectUser = (state) => state.users.user;
export const selectWatchlist = (state) => state.users.watchlist;

export default usersSlice.reducer;
