import React from 'react';
import axios from 'axios';

import {Button, Card, Col, Row} from 'antd';
import * as Constants from '../Constants';

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

    deleteArticle(articleId) {
        if(window.confirm("Are you sure?")) {
            axios.delete(`${Constants.DELETE_API_URL}${articleId}`)
                .then(res => {
                    console.log("deleted article!");
                    this.props.history.push(`/`);
                })
                .catch(err => {
                    console.log("cannot delete");
                    console.log(err);
                })
        }
    }

    render() {
        let article = this.state.article;
        return (
            <Card title={article.title}>
                <p>{article.content}</p>
                <div>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <a href={`/update/${article.id}`}>update</a>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                          <Button type="link" onClick={() => {this.deleteArticle(article.id)}}>delete</Button>
                      </Col>
                    </Row>
                </div>
            </Card>
        );
    }
}
export default ArticleDetailView;