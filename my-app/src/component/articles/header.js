import React from 'react';
import { Link } from 'react-router-dom'
import SimpleMenu from './icon'

import './header.css'
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
                        <Link to="/">GIFTS</Link>
                    </li>
                    <li>
                        <Link to="/">FEEDS</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Toolbar;

