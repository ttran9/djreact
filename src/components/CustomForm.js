import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import * as Constants from "../Constants";

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        const description = event.target.elements.description.value;
        let values = {};
        values['title'] = title;
        values['content'] = content;
        values['description'] = description;

        switch(requestType) {
            case 'post':
                return axios.post(`${Constants.BASE_API_URL}`, values)
                    .then(res => {
                        console.log("updated article!");
                        this.props.history.push(`/${res.data.id}`);
                    })
                    .catch(err => {
                        console.log("Error updating the existing article!!");
                        console.log(err);
                    });
            case 'put':
                return axios.put(`${Constants.BASE_API_URL}${articleID}/`, values)
                    .then(res => {
                        console.log("updated article!");
                        this.props.history.push(`/${res.data.id}`);
                    })
                    .catch(err => {
                        console.log("Error updating the existing article!!");
                        console.log(err);
                    });
            default:
                console.log("weird error (we shouldn't see this!!");
                break;
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleFormSubmit(
                        event,
                        this.props.requestType,
                        this.props.articleID)}>
                    <Form.Item label="title">
                        <Input name="title" placeholder="Put a title here" />
                    </Form.Item>
                    <Form.Item label="content">
                        <Input name="content" placeholder="Enter some content..." />
                    </Form.Item>
                    <Form.Item label="description">
                        <Input name="description" placeholder="Enter a description" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            {this.props.btnText}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

CustomForm = Form.create({})(CustomForm);
export default CustomForm;

