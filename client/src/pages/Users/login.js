import React, { Component, Fragment } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Checkbox } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './login.less';

const namespace = 'user_model';
const mapStateToProps = (state) => {
  const { registerResult, loginResult } = state[namespace];
  return { registerResult, loginResult };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postLoginData: (param, callback) => {
      dispatch({
        type: `${namespace}/postLoginData`,
        payload: param,
        callback,
      });
    },
    postRegisterData: (param, callback) => {
      dispatch({
        type: `${namespace}/postRegisterData`,
        payload: param,
        callback,
      });
    },
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class Login extends Component {
  handleSubmit = (e) => {
    const {
      form: { validateFields },
      postLoginData,
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        new Promise((resolve) => {
          postLoginData({ email, password }, (res) => {
            resolve(res);
          });
        }).then(() => {
          router.push('/');
        });
      }
    });
  };

  handleRegister = () => {
    router.push('/user/register');
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.login_container}>
        <Form className={styles.login_form}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox style={{ float: 'left' }}>记住密码</Checkbox>)}
            <a className={styles.login_forget} href="">
              忘记密码？
            </a>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              className={styles.login_button}
            >
              登陆
            </Button>
            <Button
              className={styles.login_button}
              onClick={this.handleRegister}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
