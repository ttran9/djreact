import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import * as Constants from "../Constants";


class ArticleUpdateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articleId: this.props.match.params.articleID,
        }

    }

    componentDidMount() {
        axios.get(`${Constants.BASE_API_URL}${this.state.articleId}`)
            .then(res => {
                let article = res.data;
                this.props.form.setFieldsValue({
                    title: article.title,
                    content: article.content,
                    description: article.description,
                });
            })
            .catch(err => {
                console.log("unable to get the existing article!");
                console.log(err);
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.put(`${Constants.UPDATE_API_URL}${this.state.articleId}`, values)
                    .then(res => {
                        console.log("updated article!");
                        this.props.history.push(`/${res.data.id}`);
                    })
                    .catch(err => {
                        console.log("Error updating the existing article!!");
                        console.log(err);
                    });
            }
        });
    };

    /*
     * idea of redirecting came from this post/thread..
     * https://stackoverflow.com/questions/53170754/redirect-after-submit-in-react
     */
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return (
          <Form
                onSubmit={this.handleSubmit}
                className="login-form">
            <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please enter a title!', min: 4, max: 40 }],
                })(
                <Input
                  type="text"
                  placeholder="title"
                  name="title"
                />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: 'Please enter some content!' }],
                })(
                <TextArea
                  placeholder="content"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  name="content"
                />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please enter a description!' }],
                })(
                <TextArea
                  placeholder="description"
                  autosize={{ minRows: 2, maxRows: 4 }}
                  name="description"
                />
                )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }}>
                <Button type="primary" htmlType="submit">
                    Update Article!
                </Button>
            </Form.Item>
          </Form>
        );
    }
}

ArticleUpdateView = Form.create({})(ArticleUpdateView);
export default ArticleUpdateView;
































