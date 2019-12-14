import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import GetById from '../../component/articles/action'
import DrawerToggleButton from '../SlideDrawer/DrawerToggleButton';
import Article from '../../component/articles/article';
import ArticleById from '../../component/articles/getbyid';
import Gift from '../../component/gifts/gift';
import Login from '../../component/login-user/login';
import Signup from '../../component/user-account/user-account';
import './Toolbar.css';


const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo"><a href="/">THE LOGO</a></div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <Router>
                    <ul>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/post-article">Post Article</Link>
                        </li>
                        <li>
                            <Link to="/articles">Articles</Link>
                        </li>
                        <li>
                            <Link to="/articleby">Articles</Link>
                        </li>
                        <li>
                            <Link to="/gifts">Gifts</Link>
                        </li>
                    </ul>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/post-article" component={Article} />
                    <Route path="/articles" component={ArticleById} />
                    <Route path="/articlesby/:article_id" component={GetById} />
                    <Route path="/gifts" component={Gift} />
                </Router>
            </div>
        </nav>
    </header>
);

export default toolbar;

