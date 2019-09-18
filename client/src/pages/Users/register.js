import React, { Component, Fragment } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './login.less'
import Link from 'umi/link'
import router from 'umi/router'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, offset: 6 }
}

class Register extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleRegister = () => {
    router.push('/user/login')
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className={styles.login_container}>
        <Form className={styles.login_form}>
          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="确认密码">
            {getFieldDecorator('re_password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
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
    )
  }
}

export default Form.create()(Register)
