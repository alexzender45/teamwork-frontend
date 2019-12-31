import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Route, HashRouter, BrowserRouter as Router } from 'react-router-dom'
=======
import { Route, BrowserRouter as Router } from 'react-router-dom'
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
import './index.css';
import Signup from './component/user-account/user-account';
import Gift from './component/gifts/gift';
import Login from './component/login-user/login'
import Article from './component/articles/article'
import ArticleById from './component/articles/design/design'
<<<<<<< HEAD
import GetById from './component/articles/getbyid/action'
import Edit from './component/articles/updateArticle/updateArticle';
import GetAllGifts from './component/gifts/landingpage/design';
import GetGiftById from './component/gifts/getgiftbyid/action';
import '@fortawesome/fontawesome-free/css/all.min.css';
const routing = (
    <HashRouter basename="/">
=======
import GetById from './component/articles/action'
const routing = (
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
    <Router>
        <div>

            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
            <Route path="/post-article" component={Article} />
            <Route path="/articles" component={ArticleById} />
            <Route path="/articlesby/:article_id" component={GetById} />
<<<<<<< HEAD
            <Route path="/articleEdit/:article_id" component={Edit} />
            <Route path="/post-gift" component={Gift} />
            <Route path="/gifts" component={GetAllGifts} />
            <Route path="/giftsby/:gift_id" component={GetGiftById} />
        </div>
    </Router>
    </HashRouter>
=======
            <Route path="/gifts" component={Gift} />
        </div>
    </Router>
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
