import React, { Component } from 'react'
import { Row, Col, Button, Input, Icon } from 'antd'
import './style.less'

class Captcha extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '获取验证码',
      btnDisabled: true,
      counting: false,
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getFieldError } = nextProps.form
    const inputError = getFieldError(nextProps.id)
    this.setState({
      btnDisabled: inputError || this.state.counting
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.setState({
      text: '获取验证码',
      btnDisabled: true,
      counting: false,
      loading: false
    })
  }

  onChange(value) {
    this.props.onChange(value)
  }

  onClick() {
    this.setState({
      ...this.state,
      loading: true
    })
    this.props.onClick().then(isSuccess => {
      this.setState({
        ...this.state,
        loading: false
      })
      if (isSuccess) {
        let { count = 60 } = this.props
        this.timer = setInterval(() => {
          if (count > -1) {
            this.setState({
              text: `剩余 ${count}s`,
              btnDisabled: true,
              counting: true
            })
            count -= 1
          } else {
            this.setState({
              text: '获取验证码',
              btnDisabled: false,
              counting: false
            })
            clearTimeout(this.timer)
          }
        }, 1000)
      }
    })
  }

  timer

  render() {
    const {
      placeholder = undefined,
      icon = undefined,
      disabled = false,
      size = 'default',
      value
    } = this.props

    return (
      <Row span={24} style={{ textAlign: 'right' }} type="flex" align="middle">
        <Col className="captcha-input">
          <Input
            size={size}
            onChange={this.onChange.bind(this)}
            placeholder={placeholder}
            prefix={icon ? <Icon type={icon} style={{ fontSize: 13 }} /> : ''}
            disabled={disabled}
            value={value}
          />
        </Col>
        {!disabled && (
          <Col className="captcha-btn-wrapper flex">
            <Button
              size={size}
              className="captcha-btn"
              type="primary"
              disabled={this.state.btnDisabled}
              onClick={this.onClick.bind(this)}
              loading={this.state.loading}
            >
              {this.state.text}
            </Button>
          </Col>
        )}
      </Row>
    )
  }
}

export default Captcha
