import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';

import CustomLayout from './containers/Layout';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    /*
     * connect can grab the store that we connected back in index.js
     * this allows us to access some of the state in the store.
     * every time our app is rendered our app checks if we are authenticated and this is where
     * mapStateToProps comes in.
     */
    /* BaseRouter evaluates what component needs to be displayed there */
    /* doing ...this.props will allow access to it inside of our customlayout component as well. */
    render() {
        return (
        <div>
            <Router>
                <CustomLayout {...this.props}>
                    <BaseRouter />
                </CustomLayout>
            </Router>
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        /*
         * in this object is what we want to map into a property.
         * this property is passed into the connect method.
         */
        isAuthenticated: state.token !== null, // if our token is null isAuthenticated is false.
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}


/*
 * inside of connect method/function we can pass in two functions
 * the first function is mapStatesToProps
 * convert states (from the store (from react-redux)) into properties that we can pass into our application.
 * the second is mapDispatchToProps
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);
