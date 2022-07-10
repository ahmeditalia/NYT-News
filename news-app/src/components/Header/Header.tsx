import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import { AccountMenu } from './components/AccountMenu';
import { CategoryMenu } from './components/CategoryMenu';
import { MobileMenu } from './components/MobileMenu';
import { SearchBar } from './components/SearchBar';



export const Header = () => {
    return (
        <>
            <AppBar position="sticky">
                <Stack flexDirection={"row"} justifyContent={{ md: "space-between" }}>
                    <Toolbar>
                        <MobileMenu />
                        <CategoryMenu />
                    </Toolbar>
                    <SearchBar />
                    <Toolbar>
                        <AccountMenu />
                    </Toolbar>
                </Stack>

            </AppBar>
            <Outlet />
        </>

    );
}