import { createSlice } from "@reduxjs/toolkit";
import  login  from "./authAsync"

const initialState = {
    user:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    token:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:()=>{

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading =true;
            state.error=null;
        })  
        .addCase(login.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token= action.payload?.token

        })
        .addCase(login.rejected,(state,action)=>{
            state.loading =false;
            state.error =  action.payload.status;
        })
    }
})

export default authSlice.reducer;