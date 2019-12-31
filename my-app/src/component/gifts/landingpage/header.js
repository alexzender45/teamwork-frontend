import React from 'react';
import { Link } from 'react-router-dom'
import SimpleMenu from './icon'

import './header.css'

const logout = () => {
    // Retrieves the user token from localStorage
    return localStorage.removeItem('token')
}
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
                        <Link to="/gifts">GIFTS</Link>
                    </li>
                    <li>
                        <Link to="/articles">ARTICLES</Link>
                    </li>
                    <li>
                        <Link to="/">FEEDS</Link>
                    </li>
                    <li>
                    <Link to="/"
                    onClick= {logout}
                    > 
                    Logout
                    </Link> 
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;

