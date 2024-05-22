import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Link} from "@mui/material";
import {useAuth} from "../providers/AuthProvider.tsx";

const authPages = {'Home': '/', 'Forms': '/forms'};
const guestPages = {'Home': '/'};
const authSettings = {'Profile': '/profile', 'Logout': '/auth/logout'};
const guestSettings = {'Login': '/auth/login', 'Sign Up': '/auth/signup'};

export const Header = () => {
    const {user} = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        localStorage.setItem('accessToken', "null");
        window.location.reload();
    };

    const token = localStorage.getItem('accessToken');

    const isAuthenticated = token !== "null" && token !== undefined && token !== null;

    const pages = isAuthenticated ? authPages : guestPages;
    const settings = isAuthenticated ? authSettings : guestSettings;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DynamicFormIcon sx={{display: {xs: 'none', md: 'flex'}}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        iFORMS
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {Object.entries(pages).map(([page, path]) => (
                                <MenuItem key={path} onClick={handleCloseUserMenu}>
                                    <Link href={path} color="inherit" underline="none">
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <DynamicFormIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        iFORMS
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex', justifyContent: 'center'},
                        gap: '10px',
                    }}>
                        {Object.entries(pages).map(([page, path]) => (
                            <Link key={path} href={path} color="inherit" underline="none">
                                <Typography variant="h6" textAlign="center">{page}</Typography>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{}}>
                                {isAuthenticated ? (
                                    <Typography variant="h6" color="white" sx={{pr:1}}>
                                        Welcome, {user?.firstName}
                                    </Typography>
                                ) : (
                                    <Typography variant="h6" color="white" sx={{pr:1}}>
                                        Guest
                                    </Typography>
                                )}
                                <AccountBoxIcon sx={{fontSize: 32, color: 'white'}}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {Object.entries(settings).map(([setting, path]) => (
                                <MenuItem
                                    key={setting}
                                    onClick={setting === 'Logout' ? logoutHandler : handleCloseUserMenu}
                                >
                                    <Link href={path} color="inherit" underline="none">
                                        <Typography variant="h8" textAlign="center">{setting}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}