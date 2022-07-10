import { createAsyncThunk } from "@reduxjs/toolkit";
import { userType } from "../../components/LogIn/LogIn";
import { public_axios } from "../../shared/axios/axiosConfig";

export const server = {
    REGISTER_URL: "auth/register",
    LOGIN_URL: "auth/login"
}



export const logIn = createAsyncThunk("user/logIn", async (user: userType)=>{
    const { LOGIN_URL } = server
    return public_axios.post(LOGIN_URL, user)
    .then(response => response.data.access_token)

});

export const register = createAsyncThunk("user/register", async (user: userType)=>{
    const { REGISTER_URL } = server
    return public_axios.post(REGISTER_URL, user)
    .then(response => response.data.access_token)
});
