import axios from "axios";

export const public_axios = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

axios.defaults.baseURL = "https://api.nytimes.com/svc/";
axios.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
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