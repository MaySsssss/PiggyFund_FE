import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import 'antd/dist/antd.css'; 

import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;


export default class Home extends Component {
  render() {
    return (
      <div>
        {/* <div className="home-card"> */}
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={require('../../picture/add.jpg')}
              />
            }
            actions={[
              <EditOutlined key="edit" />,
            ]}
          >
            <Link to="/additems/" >
              <Meta
                title="Add Transcation"
                description="Record your income and expense"
              />
            </Link>
          </Card>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={require('../../picture/add.jpg')}
              />
            }
            actions={[
              <EditOutlined key="edit" />,
            ]}
          >
            <Link to="/budget/" >
              <Meta
                title="Add Budget"
                description="Manage your future spends"
              />
            </Link>
          </Card>
        {/* </div> */}
      </div>
    )
  }
}
