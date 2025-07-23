import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";

// object or class

interface User {
  name?: string;
  email: string;
  password: string;
   userId:string,
}

const userInitialState: User = {
  name: "",
  email: "",
  password: "",
   userId:"",
};

export const authSlices = createSlice({
  name: "auth",
  initialState: userInitialState,

  reducers: {
    signUp: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
    },
    signIn:  (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { signUp,signIn } = authSlices.actions;

export default authSlices.reducer;
