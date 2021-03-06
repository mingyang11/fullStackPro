import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import mystyles from './login.less';

@connect(data => ({ ...data }))
@Form.create()
class LoginPage extends Component {
  componentDidMount() {}

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: { ...values },
        });
      }
    });
  };

  toRegisterPage = () => {
    router.push('/user/register');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={mystyles.main}>
        <Form onSubmit={this.handleSubmit} className={mystyles.loginForm}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="邮箱"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox className={mystyles.autoLogin}>自动登陆</Checkbox>)}
            <Link className={mystyles.loginFormForgot} to="/user/forget">
              忘记密码
            </Link>
            <Button type="primary" htmlType="submit" className={mystyles.loginFormButton}>
              点击登陆
            </Button>
            <Button
              type="primary"
              className={mystyles.loginFormButton}
              onClick={this.toRegisterPage}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
