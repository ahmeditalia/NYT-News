import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAll } from "../../features/categoryArticle/articleAPI";

type ArticleViewProps = {
    category?: string
}

export const ArticleView = ({ category }: ArticleViewProps) => {

    const { title } = useParams();
    const article = useAppSelector(state => state.article.articles.find((article) => article.title == title));
    const dispatch = useAppDispatch();
    console.log(article);

    useEffect(() => {
        if (!article) {
            if(category){
                const lowerCaseCategory = category?.toLowerCase();
                dispatch(getAll(lowerCaseCategory));
            }else{

            }
            
        }
    }, [category])

    return (
        <Container >
            <Grid paddingY={10} container spacing={4}>
                <Grid item>
                    <Typography align="left" variant="subtitle1" color={"darkgray"}> {article?.byline}  </Typography>
                    <Typography align="left" variant="subtitle2" color={"green"}> {article?.published_date} </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom align="center" variant="h2" component={"h1"} fontWeight={"bold"}> {article?.title} </Typography>
                </Grid>
                <Grid item>
                    {
                        article?.multimedia && article?.multimedia[0] &&
                        <Card>
                            <CardMedia
                                component="img"
                                image={article?.multimedia[0].url}
                                alt={article?.multimedia[0].caption}

                            />
                            <CardContent>
                                {article?.multimedia[0].caption && <Typography align="left" gutterBottom variant="subtitle1" color={"darkgray"} fontStyle={"italic"}> {article?.multimedia[0].caption}  </Typography>}
                                {article?.multimedia[0].copyright && <Typography align="right" variant="subtitle2" color={"green"}> {`copyright: ${article?.multimedia[0].copyright}`} </Typography>}
                            </CardContent>
                        </Card>
                    }
                </Grid>
                <Grid item>
                    <Typography align="left" paragraph variant="body1" fontSize={22}> {article?.abstract} </Typography>

                </Grid>
            </Grid>

        </Container>
    )
}