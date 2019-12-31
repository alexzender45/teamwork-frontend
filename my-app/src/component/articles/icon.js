import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}> <Link to="/">ARTICLES</Link></MenuItem>
<<<<<<< HEAD
                <MenuItem onClick={handleClose}><Link to="gifts">GIFTS</Link></MenuItem>
=======
                <MenuItem onClick={handleClose}><Link to="#">GIFTS</Link></MenuItem>
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
                <MenuItem onClick={handleClose}><Link to="#">FEEDS</Link></MenuItem>
            </Menu>
        </div>
    );
}