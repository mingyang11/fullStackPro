import React, { Component, Fragment } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './login.less'
import Link from 'umi/link'
import router from 'umi/router'

class Login extends Component {
  handleSubmit = e => {
    const {
      form: { validateFields }
    } = this.props
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
    router.push('/')
  }

  handleRegister = () => {
    router.push('/user/register')
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className={styles.login_container}>
        <Form className={styles.login_form}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
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
    )
  }
}

export default Form.create()(Login)
