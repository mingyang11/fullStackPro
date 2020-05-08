import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './login.less';
import Link from 'umi/link';
import router from 'umi/router';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, offset: 6 },
};

const namespace = 'user_model';
const mapStateToProps = (state) => {
  const { registerResult } = state[namespace];
  return { registerResult };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postRegister: (payload, callback) => {
      dispatch({
        type: `${namespace}/postRegister`,
        payload,
        callback,
      });
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Register extends Component {
  handleRegister = () => {
    const { form, postRegister } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        postRegister(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.login_container}>
        <Form className={styles.login_form}>
          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的用户名' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="手机号">
            {getFieldDecorator('mobile', {
              rules: [{ required: true, message: '请输入您的手机号' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="email">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入您的email!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码' }],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="确认密码">
            {getFieldDecorator('re_password', {
              rules: [{ required: true, message: '请再次输入您的密码' }],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button
              className={styles.login_button}
              onClick={this.handleRegister}
            >
              点击注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
