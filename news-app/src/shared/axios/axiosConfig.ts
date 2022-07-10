import axios from "axios";
import { server } from "../../features/user/userApi";

export const public_axios = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

type userInfoType ={
    email: string, 
    password: string, 
    iat: number, 
    exp: number
}


axios.defaults.baseURL = "https://api.nytimes.com/svc/";
axios.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("token");


    if (token) {
        const userInfo: userInfoType = JSON.parse(window.atob(token.split(".")[1]));
        if(new Date().getTime() > userInfo.exp * 1000){
            const response = await public_axios.post(server.LOGIN_URL, {email : userInfo.email, password: userInfo.password});
            token = response.data.access_token;
            localStorage.setItem("token", token as string);
        }
        config.headers = {
            ...config.headers,
            Accept: "application/json",
            // authorization: `Bearer ${token}`
        };
        config.params = {
            ...config.params,
            "api-key": "XspS0oUUS0BncaaC8D0k1vzpVRTCvuD0"
        }
    }

    return config;
},
    error => Promise.reject(error)
)