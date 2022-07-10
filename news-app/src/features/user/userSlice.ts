import { createSlice } from "@reduxjs/toolkit";
import { logIn, register } from "./userApi";


type userStateProps = {
    token: boolean,
    logInError: string,
    regError: string
}


const initialState: userStateProps = {
    token:  localStorage.getItem("token")? true: false,
    logInError: "",
    regError: ""
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        logout: (state) =>{
            localStorage.removeItem("token");
            state.token = false;
            state.logInError = "";
            state.regError = "";
        }
    },
    extraReducers: (builder) => {

        builder.addCase(logIn.fulfilled, (state, action)=>{
            localStorage.setItem("token", action.payload);
            state.token = true;
            state.logInError = "";
        });

        builder.addCase(logIn.rejected, (state, action)=>{
            state.logInError = action.error.message || "failed to logIn";
        });

        builder.addCase(register.fulfilled, (state, action)=>{
            localStorage.setItem("token", action.payload);
            state.token = true;
            state.regError = "";
        });

        builder.addCase(register.rejected, (state, action)=>{
            state.regError = action.error.message || "failed to register";
        });


    }
})


export const userReducer =  userSlice.reducer;
export const userActions = userSlice.actions;