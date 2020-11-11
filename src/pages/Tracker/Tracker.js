import React, { Component } from 'react';

import { Balance } from '../../components/Transaction/Balance';
import { Chart } from '../../components/Transaction/Chart';
import { IncomeExpenses } from '../../components/Transaction/IncomeExpenses';
import { TransactionList } from '../../components/Transaction/TransactionList';
import { GlobalProvider } from '../../context/GlobalState';

import cookie from 'react-cookies'

import './Tracker.css'
import { notification, Drawer, Form, Col, Row, DatePicker, AutoComplete, Input } from 'antd';

function onOk(value) {
  console.log('onOk: ', value);
}

export const loginUser = () => {
  let id = parseInt(cookie.load('userInfo'))
  return id
}

export default class Tracker extends Component {
  state = {
    visible: false,
    error: null,
    isLoaded: false,
    inputcategory: "",
    datas: {
      amount: ""
    },
    date: "", 
    categories: []
  };

  componentDidMount() {
    this.getCategory()
  }

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

  getCategory = async() => {
    try {
      let res = await fetch(`http://ballistic-circular-parent.glitch.me/getallcategory`);
      let posts = await res.json();
      this.setState({
        categories: posts
      });
    } catch (err) {
      console.log(err);
    }
  }  

  addItems = _ => {
    const { datas, date, inputcategory } = this.state;
      let userid = loginUser();
      if (inputcategory.length === 0) {
          notification['error']({
              message: 'Add',
              description:
                  'Please enter the category name.',
          });
      } else if (datas.amount.length === 0 || parseInt(datas.amount) === 0) {
          notification['error']({
              message: 'Add',
              description:
                  'Please enter a valid number for amount (non-zero).',
          });
      } else {
          fetch(`https://be-4920.herokuapp.com/spending?category=${inputcategory}&amount=${datas.amount}&time=${date}&userid=${userid}`)
              .then(console.log('Add item success'))
              .catch(error =>
                  this.setState({
                      isLoaded: true,
                      error: error
                  })
          );
          this.openNotificationWithIcon('success');
          this.onClose();
      }
  }

  onChange = (value) => {
    this.setState({
      date: value.toISOString()
    })
  }

  onSelect_inputauto = (data) => {
    this.setState({
      inputcategory: data
    })
    // console.log('onSelect', data);
  };
  onChange_inputauto = (data) => {
    this.setState({
      inputcategory: data
    })
    // console.log('onSelect', data);
  };

  render() {
    const { datas, categories } = this.state;
    return (
      <GlobalProvider>

        <div className="container">
          <div className="left_container">
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
                <button className='additem-btn' onClick={() => {this.addItems();}} type="primary">Add Item</button>
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
                    <AutoComplete
                        dataSource={categories}
                        onChange={this.onChange_inputauto}
                        onSearch={this.onSelect_inputauto}
                        children={
                          <Input 
                            placeholder="Enter catagory..." 
                            type="text"
                          />
                        }
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
          </div>

          <div className="right_container">
            <TransactionList />
          </div>
          
          
          
          
        </div>
      </GlobalProvider>
    );
  }
}
