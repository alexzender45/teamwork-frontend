import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Signup from './component/user-account/user-account';
import Gift from './component/gifts/gift';
import Login from './component/login-user/login'
import Article from './component/articles/article'
import ArticleById from './component/articles/design/design'
import GetById from './component/articles/getbyid/action'
import Edit from './component/articles/updateArticle/updateArticle';
import GetAllGifts from './component/gifts/landingpage/design';
import GetGiftById from './component/gifts/getgiftbyid/action';
import '@fortawesome/fontawesome-free/css/all.min.css';
const routing = (
    <HashRouter basename="/">
    <Router>
        <div>

            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
            <Route path="/post-article" component={Article} />
            <Route path="/articles" component={ArticleById} />
            <Route path="/articlesby/:article_id" component={GetById} />
            <Route path="/articleEdit/:article_id" component={Edit} />
            <Route path="/post-gift" component={Gift} />
            <Route path="/gifts" component={GetAllGifts} />
            <Route path="/giftsby/:gift_id" component={GetGiftById} />
        </div>
    </Router>
    </HashRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
