import { createSlice } from "@reduxjs/toolkit";

type isActive =boolean;

const isLogIn: isActive = false;

const loaddingState = createSlice({
  name: "loading",
  initialState: isLogIn,
  reducers: {},
});
