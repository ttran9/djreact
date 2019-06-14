import React from 'react';
import axios from 'axios';
import Articles from '../components/Article';
import * as Constants from '../Constants';
import CustomForm from '../components/CustomForm';
import { connect } from 'react-redux';
class ArticleListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if(newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${newProps.token}`
            }
        }
        axios.get(`${Constants.BASE_API_URL}`)
            .then(res => {
                this.setState({
                    articles: res.data
                });
            })
            .catch(err => {
                console.log("INSIDE LIST VIEW!!");
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles}/>
                <h2>Create an article</h2>
                <CustomForm
                    requestType="post"
                    articleID={null}
                    btnText="Create"/>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArticleListView);