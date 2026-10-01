import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, name: "yousef elsayed" },
  reducers: {
    logInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  extraReducers: (builder) => {},
});

export const { logInOut } = authSlice.actions;
export default authSlice.reducer;
