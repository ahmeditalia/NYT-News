import { ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { categories, category } from "../../../../categories";

export const CategoryMenu = () => {

    const navigate = useNavigate();

    const handleMenuItemClick = (event: unknown, url: string) => {
        const params = {page : "1"};
        navigate({
            pathname: url,
            search: `?${createSearchParams(params)}`,
        });
    }
    return (
        <Stack direction={'row'} alignItems={"center"} sx={{ display: { xs: "none", md: "flex" } }} >
            <Typography
                variant="h6"
                noWrap
                component="div"
            >
                MUI
            </Typography>
            <Stack direction={'row'} sx={{ ml: 3 }}>
                {
                    categories.map(({ name, url }: category) => {
                        return (
                            <ListItem key={name}>
                                <ListItemButton>
                                    <ListItemText primary={name} onClick={(event) => handleMenuItemClick(event, url)} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </Stack>

        </Stack>
    );

}