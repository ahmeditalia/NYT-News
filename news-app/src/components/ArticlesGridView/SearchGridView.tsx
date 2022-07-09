import { Alert, Box, CircularProgress, Grid, Typography, } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { articleType } from "../../features/categoryArticle/article.types";
import { searchArticles } from "../../features/categoryArticle/articleAPI";
import { ArticleCard } from "./components/ArticleCard";
import { GridPagination } from "./components/GridPagination";

export const SearchGridView = () => {
    const {
        pending,
        error,
    } = useAppSelector(state => state.article);


    const articles: articleType[] = useAppSelector(state => state.article.articles);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const search = searchParams.get("search");
        const page = (Number(searchParams.get("page")) || 1) - 1;
        dispatch(searchArticles({
            search: search || "",
            page: page
        }))
    }, [searchParams, dispatch])

    return (
        <Box sx={{ padding: { xs: 3, md: 10 } }}>
            <Typography align="left" paddingBottom={5} color={"GrayText"} variant="h4" component={"h4"}>search</Typography>
            {
                pending ? <CircularProgress />
                    :
                    error !== "" ? <Alert severity="error">{error}</Alert>
                        :
                        <Grid container columnSpacing={5} rowSpacing={10} justifyContent={"center"}>
                            {
                                articles.map((article, index) => {
                                    return <Grid key={index + article?.title} item >
                                        <ArticleCard article={article}></ArticleCard>
                                    </Grid>
                                })
                            }
                            <GridPagination />

                        </Grid>
            }

        </Box>
    )
}