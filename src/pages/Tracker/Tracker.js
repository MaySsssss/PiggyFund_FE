import React, { Component } from 'react';
import { Header } from '../../components/Transaction/Header';
import { Balance } from '../../components/Transaction/Balance';
import { Chart } from '../../components/Transaction/Chart';
import { IncomeExpenses } from '../../components/Transaction/IncomeExpenses';
import { TransactionList } from '../../components/Transaction/TransactionList';

import { GlobalProvider } from '../../context/GlobalState';

import './Tracker.css'

import { notification, Drawer, Form, Col, Row, DatePicker } from 'antd';

function onOk(value) {
  console.log('onOk: ', value);
}

export default class Tracker extends Component {
  state = {
    visible: false,
    error: null,
    isLoaded: false,
    datas: {
      amount: "",
      category: ""
    },
    date: ""
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Add',
      description:
        'Add new transcation success.',
    });
  };

  addItems = _ => {
    const { datas, date } = this.state;
    fetch(`https://ballistic-circular-parent.glitch.me/spending?category=${datas.category}&amount=${datas.amount}&fbclid=IwAR3ruVBFMXI2d-mgnolt0OCgP3UPI2i2ogs_HNDtVGEjgWbzN8XDpzsKK6w&time=${date}`)
      .then(console.log('Add item success'))
      .catch(error => 
        this.setState({
          isLoaded: true,
          error: error
        })
      )
  }

  onChange = (value) => {
    this.setState({
      date: value.toISOString()
    })
  }

  render() {
    const { datas } = this.state;
    return (
      <GlobalProvider>
        <Header />
        <div className="container">
          <Balance />
          <Chart />
          <IncomeExpenses />
          <button className='back-btn' onClick={this.showDrawer} type="primary">Add Transcation</button>
          <Drawer
            title="Add a new transcation"
            width={520}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <button className='additem-btn' type="primary" onClick={this.onClose} style={{ marginRight: 8 }}>Cancel</button>
                <button className='additem-btn' onClick={() => {this.addItems(); this.openNotificationWithIcon('success'); this.onClose();}} type="primary">Add Item</button>
              </div>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="dateTime"
                    label="DateTime"
                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                  >
                    <DatePicker className='date-input' 
                      size="large" 
                      style={{ width: '100%' }}
                      onChange={this.onChange} 
                      onOk={onOk} 
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please enter the category' }]}
                  >
                    <input 
                      type="text"
                      placeholder="Enter catagory..." 
                      value={datas.category} 
                      onChange={e => this.setState({ datas: { ...datas, category: e.target.value}})}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please enter the amount' }]}
                  >
                    <input 
                      type="number"
                      placeholder="Enter Amount..." 
                      value={datas.amount} 
                      onChange={e => this.setState({ datas: { ...datas, amount: e.target.value}})}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
          <TransactionList />
          
          
        </div>
      </GlobalProvider>
    );
  }
}
