import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import 'antd/dist/antd.css'; 

import { Card, Avatar, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;


export default class Home extends Component {
  render() {
    return (
      <div className="home-card">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={require('../../picture/home1.jpg')}
                />
              }
              // actions={[
              //   <EditOutlined key="edit" />,
              // ]}
            >
              <Link to="/additems/" >
                <Meta
                  title="Add Transcation"
                  description="Record your income and expense"
                />
              </Link>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={require('../../picture/home2.jpg')}
                />
              }
              // actions={[
              //   <EditOutlined key="edit" />,
              // ]}
            >
              <Link to="/budget/" >
                <Meta
                  title="Add Budget"
                  description="Manage your future spends"
                />
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
