import { Typography, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { articleType } from "../../../features/article/article.types";

type ArticleCardProps = {
    article: articleType
}

export const ArticleCard = ({ article}: ArticleCardProps) => {
    const navigate = useNavigate();
    return (

        <Card sx={{ width: 345 }}>
            <CardActionArea onClick={()=> navigate({pathname:article.title})}>
                <CardMedia
                    component="img"
                    height="240"
                    image={article?.multimedia && article?.multimedia[0]?.url}
                    alt={article?.multimedia && article?.multimedia[0]?.caption}

                />
                <CardContent sx={{ height: 200 }}>
                    <Typography align="left" variant="subtitle2" color={"green"}> {article?.published_date} </Typography>
                    <Typography align="left" variant="h6" component={"h6"} fontWeight={"bold"} fontSize={18}> {article?.title} </Typography>
                    <Typography align="left" gutterBottom variant="subtitle1" color={"darkgray"}> {article?.byline}  </Typography>
                    <Typography align="left" noWrap paragraph variant="body1" color={"GrayText"}> {article?.abstract} </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}