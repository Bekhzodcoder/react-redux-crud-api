import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistance-storage";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
    },

    // Login
    // loginUserStart: (state) => {
    //   state.isLoading = true;
    // },

    // loginUserSuccess: (state) => {
    //   state.loggedIn = true;
    //   state.isLoading = false;
    // },
    // loginUserFailure: (state) => {
    //   state.isLoading = false;
    //   state.error = "error";
    // },

    //register
    // registerUserStart: (state) => {
    //   state.isLoading = true;
    // },

    // registerUserSuccess: (state) => {
    //   state.loggedIn = true;
    //   state.isLoading = false;
    // },
    // registerUserFailure: (state) => {
    //   state.isLoading = false;
    //   state.error = "error";
    // },
  },
});

// export const {
//   loginUserStart,
//   loginUserSuccess,
//   loginUserFailure,
//   registerUserStart,
//   registerUserSuccess,
//   registerUserFailure,
// } = authSlice.actions;

export const { signUserStart, signUserSuccess, signUserFailure, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
