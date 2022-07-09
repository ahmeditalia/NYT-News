import { createSlice } from "@reduxjs/toolkit";
import { articleType } from "./article.types";
import { getAll, searchArticles } from "./articleAPI";


type initialStateProps = {
    articles: articleType[],
    size: number,
    api_key: string,
    pages:number,
    sizePerPage: number,
    pending: boolean,
    error: string,
    searchedList: string[]

}

const initialState: initialStateProps = {
    articles: [],
    size: 0,
    api_key: "XspS0oUUS0BncaaC8D0k1vzpVRTCvuD0",
    pages: 1,
    sizePerPage: 12,
    pending: false,
    error: "",
    searchedList: [],

}

const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        addSearch(state, action) {
            state.searchedList.unshift(action.payload);
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
            console.log(action.payload);
        })

        builder.addCase(getAll.rejected, (state, action) => {
            state.error = action.error.message || "Failed to load data";
            state.pending = false;
        })

        builder.addCase(searchArticles.pending, (state) => {
            state.pending = true;
        })

        builder.addCase(searchArticles.fulfilled, (state, action) => {
            console.log("fullfiled");
            console.log(action.payload);
            state.pending = false;
            state.error = "";
            state.size = action.payload.meta.hits;
            state.pages = Math.ceil(state.size / state.sizePerPage);
            state.articles = action.payload.results;
        })

        builder.addCase(searchArticles.rejected, (state, action) => {
            console.log("error");
            console.log(action.error);
            // state.error = action.error.message || "Failed to load data";
            // state.pending = false;
        })

    },

});

export const articleReducer = articleSlice.reducer;
export const articleActions = articleSlice.actions;