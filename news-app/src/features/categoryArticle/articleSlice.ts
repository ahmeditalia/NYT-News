import { createSlice } from "@reduxjs/toolkit";
import { articleType } from "./article.types";
import { getAll, getByTitle, searchArticles } from "./articleAPI";


type initialStateProps = {
    articles: articleType[],
    size: number,
    api_key: string,
    pages:number,
    sizePerPage: number,
    pending: boolean,
    error: string,
    history: string[]

}

const inithistory: string = localStorage.getItem("history") || "[]";

const initialState: initialStateProps = {
    articles: [],
    size: 0,
    api_key: "XspS0oUUS0BncaaC8D0k1vzpVRTCvuD0",
    pages: 1,
    sizePerPage: 12,
    pending: false,
    error: "",
    history: JSON.parse(inithistory) || [],

}

const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        addSearch(state, action) {
            state.history = state.history.filter( word => word != action.payload);
            state.history.unshift(action.payload);
            localStorage.setItem("history" , JSON.stringify(state.history));
        }
    },
    extraReducers(builder) {
        builder.addCase(getAll.pending , (state)=> {
            state.pending = true;
        })

        builder.addCase(getAll.fulfilled, (state, action) => {
            state.pending = false;
            state.error = "";
            const results:articleType[] = action.payload.results.filter((article: articleType) => article.title.length > 0);
            state.size = results.length;
            state.pages = Math.ceil(results.length/state.sizePerPage);
            state.articles = results;
        })

        builder.addCase(getAll.rejected, (state, action) => {
            state.error = action.error.message || "Failed to load data";
            state.pending = false;
        })

        builder.addCase(searchArticles.pending, (state) => {
            state.pending = true;
        })

        builder.addCase(searchArticles.fulfilled, (state, action) => {

            state.pending = false;
            state.error = "";
            state.size = action.payload.meta.hits;
            state.pages = Math.ceil(state.size / state.sizePerPage);
            state.articles = action.payload.results;
        })

        builder.addCase(searchArticles.rejected, (state, action) => {
            state.error = action.error.message || "Failed to load data";
            state.pending = false;
        })

        
        builder.addCase(getByTitle.pending, (state) => {
            state.pending = true;
        })

        builder.addCase(getByTitle.fulfilled, (state, action) => {
            state.pending = false;
            state.error = "";
            state.size = action.payload.meta.hits;
            state.pages = Math.ceil(state.size / state.sizePerPage);
            state.articles = action.payload.results;
        })

        builder.addCase(getByTitle.rejected, (state, action) => {

            state.error = action.error.message || "Failed to load data";
            state.pending = false;
        })

    },

});

export const articleReducer = articleSlice.reducer;
export const articleActions = articleSlice.actions;