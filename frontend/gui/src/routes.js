import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ArticleListView from './containers/ArticleListView';
import ArticleDetailView from './containers/ArticleDetailView';
import ArticleCreateUpdateView from './containers/ArticleCreateUpdateView';


const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path='/create' component={ArticleCreateUpdateView}/>
            <Route exact path='/' component={ArticleListView}/>
            <Route exact path='/:articleID' component={ArticleDetailView}/>
            <Route exact path='/update/:articleID' component={ArticleCreateUpdateView}/>
        </Switch>
    </div>
);

export default BaseRouter;