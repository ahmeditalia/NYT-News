import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { modify } from "./article.types";


export const getAll = createAsyncThunk("article/get", async (category: string) => {
    const api = `/topstories/v2/${category}.json`;
    return axios.get(api, {
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(res => res.data)

})


type serachProps = {
    search: string,
    page: number
}


export const searchArticles = createAsyncThunk("article/search", async ({search, page}: serachProps)=>{
    const api = `search/v2/articlesearch.json?q=${search}&page=${page}`;
    return axios.get(api, {
        "headers": {
            "Accept": "application/json",
        }
    })
        .then(res => {
            res.data.response.results = modify(res.data.response.docs);
            return res.data.response;
        })

})




