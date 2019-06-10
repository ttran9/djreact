import React from 'react';
import axios from 'axios';

import {Card, Col, Row} from 'antd';
import * as Constants from '../Constants';

class ArticleDetailView extends React.Component {

    state = {
      article: {}
    };

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
                        <div className="gutter-box">DELETE (TBA)</div>
                      </Col>
                    </Row>
                </div>
            </Card>
        );
    }
}
export default ArticleDetailView;