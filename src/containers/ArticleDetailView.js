import React from 'react';
import axios from 'axios';

import {Button, Card} from 'antd';
import * as Constants from '../Constants';
import CustomForm from '../components/CustomForm';
import { connect } from "react-redux";

class ArticleDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {}
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
        const articleId = this.props.match.params.articleID;
        console.log(articleId);
        // called whenever this component is mounted.
        axios.get(`${Constants.BASE_API_URL}${articleId}/`)
            .then(res => {
                this.setState({
                    article: res.data
                });
            })
            .catch(err => {
                console.log("INSIDE DETAIL VIEW ERROR!!");
                console.log(err);
            });
    }


    handleDelete = (event) => {
        if(this.props.token !== null) {
            const articleId = this.props.match.params.articleID;
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.delete(`${Constants.BASE_API_URL}${articleId}/`);
            this.props.history.push("/");
            this.forceUpdate();
        } else {
            console.log('the article cannot be loaded..');
        }
    };

    render() {
        let article = this.state.article;
        return (
            <div>
                <Card title={article.title}>
                    <h2>{article.description}</h2>
                    <p>{article.content}</p>
                </Card>
                <CustomForm
                    requestType="put"
                    articleID={this.props.match.params.articleID}
                    btnText="Update"/>
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArticleDetailView);
