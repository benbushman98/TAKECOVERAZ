import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from "react-router-dom"; // <-- import useLocation

const drawerWidth = 200;
const navItems = ['About', 'Calendar', 'Playlist', 'Contact'];

const style = {
    img: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "",
        height: "100px",
    },
    header: {
        height: "250px"
    },
    buttons: {

    }
}

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation(); // <-- get current location

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isActive = (item) => {
        if (item === 'Home' && location.pathname === '/') return true;
        return location.pathname.toLowerCase() === `/${item.toLowerCase()}`;
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className="bg-black text-white h-100">
            <Typography variant="h5" sx={{ my: 2 }} className="bg-black text-white text-uppercase fw-bold">
                Menu
            </Typography>
            <Divider />
            <List className="bg-black text-white">
                <ListItem className='d-flex justify-content-center my-4 fs-5' disablePadding>
                    <Link
                        className={`text-decoration-none ${location.pathname === '/' ? 'text-danger' : 'text-white'}`}
                        to={`/`}
                    >
                        Home
                    </Link>
                </ListItem>
                {navItems.map((item) => (
                    <ListItem className='d-flex justify-content-center my-4 fs-5' key={item} disablePadding >
                        <Link
                            className={`text-decoration-none ${isActive(item) ? 'text-danger' : 'text-white'}`}
                            to={`/${item}`}
                        >
                            {item}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box className='position-absolute' sx={{ display: 'flex' }} style={style.header}>
            <AppBar component="nav">
                <Toolbar className="bg-black">

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src="images/take-cover_tiny.webp" sx={{ display: { xs: "none" } }} className="App-logo my-2" alt="logo" style={style.img} />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ color: 'inherit' }}>
                            <Link
                                className={`text-decoration-none ${location.pathname === '/' ? 'text-danger' : 'text-white'}`}
                                to={`/`}
                            >
                                Home
                            </Link>
                        </Button>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: 'inherit' }}>
                                <Link
                                    className={`text-decoration-none ${isActive(item) ? 'text-danger' : 'text-white'}`}
                                    to={`/${item}`}
                                >
                                    {item}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;