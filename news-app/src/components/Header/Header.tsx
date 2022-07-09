import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import { AccountMenu } from './components/AccountMenu';
import { CategoryMenu } from './components/CategoryMenu';
import { MobileMenu } from './components/MobileMenu';
import { SearchBar } from './components/SearchBar';
import { appBarStyle } from './Header.styles';



export const Header = () => {
    return (
        <>
            <AppBar position="sticky" sx={appBarStyle}>
                <Toolbar>
                    <MobileMenu />
                    <CategoryMenu />
                    <SearchBar />
                </Toolbar>
                <Toolbar>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Outlet />
        </>

    );
}