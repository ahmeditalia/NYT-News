import { createSlice } from "@reduxjs/toolkit";
import { logIn, register } from "./userApi";


type userStateProps = {
    email: string,
    password: string,
    token: boolean,
    error: string
}


const initialState: userStateProps = {
    email: "",
    password: "",
    token:  localStorage.getItem("token")? true: false,
    error: ""
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setEmail: (state, action)=>{
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        logout: (state) =>{
            localStorage.removeItem("token");
            state.email = "";
            state.password = "";
            state.token = false;
            state.error = "";
        }
    },
    extraReducers: (builder) => {

        builder.addCase(logIn.fulfilled, (state, action)=>{
            localStorage.setItem("token", action.payload);
            state.token = true;
            state.error = "";
        });

        builder.addCase(logIn.rejected, (state, action)=>{
            state.error = action.error.message || "failed to logIn";
        });

        builder.addCase(register.fulfilled, (state, action)=>{
            localStorage.setItem("token", action.payload);
            state.token = true;
            state.error = "";
        });

        builder.addCase(register.rejected, (state, action)=>{
            state.error = action.error.message || "failed to logIn";
        });


    }
})


export const userReducer =  userSlice.reducer;
export const userActions = userSlice.actions;