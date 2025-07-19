import { createSlice } from "@reduxjs/toolkit";


// object or class 

interface User{
    name?:string,
    email:string,
    password:string,
}

const userInitialState:User = {
    name:"",
    email:"",
    password:""
}

export const authSlices=createSlice({

    name:"auth",
    initialState:userInitialState,

    reducers:{
        signUp:(state,action)=>{

            state.push(action.payload);


        },
    }


})

export const {signUp} = authSlices.actions;

export default authSlices.reducer;