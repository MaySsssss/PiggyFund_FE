import React, { createContext, useState, useEffect } from 'react';
import { Drawer, Form, Col, Row, DatePicker } from 'antd';

function onOk(value) {
    console.log('onOk: ', value);
}

export const Notification = () => {
    var visible = false;
    var error = null;
    var isLoaded = false;
    var datas = {
        date: "",
        context: ""
    };

    function showDrawer() {
        console.log('Open');
        visible = true;
    };

    function onClose() {
        visible = false;
    };

    return (
        <>
            <div className="notification">
                test
                <button className='back-btn' onClick={showDrawer()} type="primary">Add Notification</button>
            </div>
            <Drawer
                title="Add a new budget"
                width={520}
                onClose={onClose()}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <button className='additem-btn' type="primary" onClick={onClose()} style={{ marginRight: 8 }}>Cancel</button>
                        <button className='additem-btn' onClick={() => { this.addBudget(); }} type="primary">Add Budget</button>
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
                                    onChange={e => { datas.date = e.toISOString(); }}
                                    onOk={onOk}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="context"
                                label="Context"
                                rules={[{ required: true, message: 'Please enter the context' }]}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter context..."
                                    value={datas.context}
                                    onChange={e => { datas.context = e; }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};