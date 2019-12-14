import React from 'react';
import './style.css'
const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__logo" style={logo}><a href="/">TEAM WORK</a></div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
            </div>
        </nav>
    </header>
);

export default Toolbar;

const logo = {
    fontSize: 'auto'
}