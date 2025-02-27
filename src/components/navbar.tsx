
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeToggle } from '../context/MyThemeProvider';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

interface NavBarProps {
    toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
    const toggleTheme = useThemeToggle();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>

                {isMobile ? (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={() => navigate("/")}>Инвентарь</MenuItem>
                            <MenuItem onClick={() => { handleMenuClose(); toggleSidebar(); }}>Фильтры</MenuItem>
                            <MenuItem onClick={() => navigate("/categories")}>Категории</MenuItem>
                            <MenuItem>Товары</MenuItem>
                            <MenuItem>Склады</MenuItem>
                            <MenuItem>О системе</MenuItem>
                            <MenuItem onClick={() => navigate("/user")}>Личная страница</MenuItem>
                            <MenuItem onClick={toggleTheme}>Переключить тему</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box display="flex" alignItems="center" flexGrow={1} gap={10}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                            <MenuIcon />
                        </IconButton>
                        <Button onClick={() => navigate("/")} sx={{ flexGrow: 1 }} color="inherit">
                            Инвентарь
                        </Button>
                        <Button color="inherit" sx={{ flexGrow: 1 }} onClick={() => navigate("/categories")}>
                            Категории
                        </Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Склады
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            О системе
                        </Typography>
                        <Button color="inherit" sx={{ flexGrow: 1 }} onClick={() => navigate("/user")}>
                            Личная страница
                        </Button>
                        <Button color="inherit" onClick={toggleTheme}>
                            Переключить тему
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
