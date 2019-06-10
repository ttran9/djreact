import React from 'react';
import { List, Icon, Row, Col } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const Articles = (props) => {
  return (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: page => {
                console.log(page);
            },
        pageSize: 3,
        }}
        dataSource={props.data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText type="like-o" text="156" />,
              <IconText type="message" text="2" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<a href={`/${item.id}`}>{item.title}</a>}
              description={item.description}
            />
                <p>{item.content}</p>
                <div>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <a href={`/update/${item.id}`}>update</a>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div className="gutter-box">DELETE (TBA)</div>
                      </Col>
                    </Row>
                </div>
          </List.Item>
        )}
    />
  );
};

export default Articles;