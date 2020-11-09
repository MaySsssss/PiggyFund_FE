import React, { Component } from 'react'
import { Chart } from '../../components/Budget/Chart';
import { BudgetList } from '../../components/Budget/BudgetList';
import { GlobalProvider_budget } from '../../context/GlobalState_budget';
import moment, { months } from 'moment';

import '../Tracker/Tracker.css'
import { notification, Drawer, Form, Col, Row } from 'antd';

function onOk(value) {
    console.log('onOk: ', value);
}

export default class Budget extends Component {
    state = {
        visible: false,
        error: null,
        isLoaded: false,
        datas: {
            amount: "",
            category: "",
            month: moment().format('MMMM')
        }
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
                'Add new budget success.',
        });
    };

    addBudget = _ => {
        const { datas } = this.state;
        fetch(`https://be-4920.herokuapp.com/updateBudget?category=${datas.category}&amount=${datas.amount}&month=${datas.month}`)
            .then(console.log('Add budget success'))
            .catch(error =>
                this.setState({
                    isLoaded: true,
                    error: error
                })
            )
    };

    render() {
        const { datas } = this.state;
        return (<>
            <GlobalProvider_budget>
                <div className="container">
                  <div className="left_container">
                    <Chart />
                    <button className='back-btn' onClick={this.showDrawer} type="primary">Add Budget</button>
                  </div>

                  <div className="right_container">
                    <BudgetList />
                  </div>
                    <Drawer
                        title="Add a new budget"
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
                                <button className='additem-btn' onClick={() => { this.addBudget(); this.openNotificationWithIcon('success'); this.onClose(); }} type="primary">Add Budget</button>
                            </div>
                        }
                    >
                        <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="month"
                                        label="Month"
                                        rules={[{ required: true, message: 'Please choose the month' }]}
                                    >
                                        <select className='date-input'
                                            onChange={e => this.setState({ datas: { ...datas, month: e.target.value } })}
                                            onOk={onOk}
                                        >
                                            {months().map(month => {
                                                if (month.localeCompare(datas.month) == 0 || (!(datas.month) && moment().format('MMMM').localeCompare(month) == 0)) {
                                                    return (<option value={month} selected>{month}</option>)
                                                } else {
                                                    return (<option value={month}>{month}</option>)
                                                }
                                            })}
                                        </select>
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
                                            onChange={e => this.setState({ datas: { ...datas, category: e.target.value } })}
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
                                            onChange={e => this.setState({ datas: { ...datas, amount: e.target.value } })}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Drawer>
                </div>
            </GlobalProvider_budget>
        </>);
    }
}

 