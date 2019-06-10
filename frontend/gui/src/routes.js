import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ArticleListView from './containers/ArticleListView';
import ArticleDetailView from './containers/ArticleDetailView';
import ArticleCreateView from './containers/ArticleCreateView';
import ArticleUpdateView from "./containers/ArticleUpdateView";


const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path='/create' component={ArticleCreateView}/>
            <Route exact path='/' component={ArticleListView}/>
            <Route exact path='/:articleID' component={ArticleDetailView}/>
            <Route exact path='/update/:articleID' component={ArticleUpdateView}/>
        </Switch>
    </div>
);

export default BaseRouter;