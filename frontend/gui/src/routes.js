import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ArticleListView from './containers/ArticleListView';
import ArticleDetailView from './containers/ArticleDetailView';


const BaseRouter = () => (
    <div>
         <Switch>
            <Route exact path='/' component={ArticleListView}/>
            <Route exact path='/:articleID' component={ArticleDetailView}/>
        </Switch>
    </div>
);

export default BaseRouter;