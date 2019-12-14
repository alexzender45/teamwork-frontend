import React from 'react';
import './user-account.css'
import { Link } from 'react-router-dom'
import './head.css'
import './user-account.css'
const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__logo" style={logo}><a href="/">TEAM WORK</a></div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;

const logo = {
    fontSize: 'auto'
}