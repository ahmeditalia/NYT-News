import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { categories, category } from "../../../../categories";


export const MobileMenu = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const toggleOpen = () => {
        setOpen(!open);
    }

    const handleMenuItemClick = (event: unknown ,url: string)=>{
        toggleOpen();
        const params = {page : "1"};
        navigate({
            pathname: url,
            search: `?${createSearchParams(params)}`,
        });
    }

    return (
        <>
            <Box sx={{ display: { xs: "block", md: "none" }, mr: 2 }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleOpen}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={toggleOpen}
            >
                <Box>
                    <List>
                        {
                            categories.map(({ name, url }: category) => {
                                return (
                                    <ListItem key={name}>
                                        <ListItemButton>
                                            <ListItemText primary={name} onClick={(event) => handleMenuItemClick(event, url)}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>

                </Box>
            </Drawer>

        </>

    )
}