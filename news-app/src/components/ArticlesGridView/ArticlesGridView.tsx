import { Alert, Box, CircularProgress, Grid, Typography, } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAll } from "../../features/article/articleAPI";
import { ArticleCard } from "../../shared/components/ArticleCard";
import { GridPagination } from "../../shared/components/GridPagination";

type ArticlesGridViewProps = {
    category: string
}

export const ArticlesGridView = ({ category }: ArticlesGridViewProps) => {
    const {
        articles,
        pending,
        error,
        sizePerPage,
        size
    } = useAppSelector(state => state.article);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const offset = (page - 1) * sizePerPage;
    const limit = Math.min(page * sizePerPage, size);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const lowerCaseCategory = category.toLowerCase();
        dispatch(getAll(lowerCaseCategory));
    }, [category])

    return (
        <Box sx={{ padding: { xs: 3, md: 10 } }}>
            <Typography align="left" paddingBottom={5} color={"GrayText"} variant="h4" component={"h4"}>{category}</Typography>
            {
                pending ? <CircularProgress />
                    :
                    error !== "" ? <Alert severity="error">{error}</Alert>
                        :
                        <Grid container columnSpacing={5} rowSpacing={10} justifyContent={"center"}>
                            {
                                articles.slice(offset, limit).map((article, index) => {
                                    return <Grid key={index + article.title} item >
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
