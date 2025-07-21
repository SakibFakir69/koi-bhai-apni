import { createSlice } from "@reduxjs/toolkit";

type isActive =boolean;

const isLogIn: isActive = false;

export const loaddingState = createSlice({
  name: "loading",
  initialState: isLogIn,
  reducers: {

    userStatus:(state, payload)=>{
      // state.push(payload.action);
      

    }


  },
});


export default loaddingState.reducer;