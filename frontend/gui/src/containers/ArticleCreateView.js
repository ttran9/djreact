import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import * as Constants from "../Constants";


class ArticleCreateView extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(`${Constants.CREATE_API_URL}`, values)
                    .then(res => {
                        console.log("success!!!");
                        this.props.history.push(`/${res.data.id}`);
                    })
                    .catch(err => {
                        console.log("Error creating the new article!!");
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
                    Submit
                </Button>
            </Form.Item>
          </Form>
        );
    }
}

ArticleCreateView = Form.create({})(ArticleCreateView);
export default ArticleCreateView;
































