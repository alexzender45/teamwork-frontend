import React from 'react';
import { Link } from 'react-router-dom'
import SimpleMenu from './icon'

import './header.css'
<<<<<<< HEAD

const logout = () => {
    // Retrieves the user token from localStorage
    return localStorage.removeItem('token')
}
=======
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__logo"><a href="/">TEAM WORK</a></div>
            <div className="spacer" />
            <div className="toolbar__toggle-button">
                <SimpleMenu />
            </div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li>
                        <Link to="/">ARTICLES</Link>
                    </li>
                    <li>
<<<<<<< HEAD
                        <Link to="/gifts">GIFTS</Link>
=======
                        <Link to="/">GIFTS</Link>
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
                    </li>
                    <li>
                        <Link to="/">FEEDS</Link>
                    </li>
<<<<<<< HEAD
                    <li>
                    <Link to="/"
                    onClick= {logout}
                    > 
                    Logout
                    </Link> 
                    </li>
=======
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;

