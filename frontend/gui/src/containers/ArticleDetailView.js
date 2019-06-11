import React from 'react';
import axios from 'axios';

import {Button, Card} from 'antd';
import * as Constants from '../Constants';
import CustomForm from '../components/CustomForm';

class ArticleDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {}
        };
    }

    componentDidMount() {
        const articleId = this.props.match.params.articleID;
        // called whenever this component is mounted.
        axios.get(`${Constants.BASE_API_URL}${articleId}`)
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

    handleDelete = () => {
        const articleId = this.props.match.params.articleID;
        axios.delete(`${Constants.BASE_API_URL}${articleId}/`);
        this.props.history.push("/");
        this.forceUpdate();
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
export default ArticleDetailView;