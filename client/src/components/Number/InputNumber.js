import React, { Component } from 'react'
import { InputNumber as AntdInputNumber } from 'antd'
import Link from 'umi/link'
import { isEmpty } from '../utils'

function formatMoney(num) {
  const numStr = `${num}`
  const nums = numStr.split('.')

  const integer = nums[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return nums.length > 1 ? `${integer}.${nums[1]}` : integer
}

export default class InputNumber extends Component {
  constructor(props) {
    super(props)
    const value =
      typeof props.value === 'number' ? props.value : props.value || undefined
    this.state = { value }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value =
        typeof nextProps.value === 'number'
          ? nextProps.value
          : nextProps.value || undefined
      this.setState({ value })
    }
  }

  handleChange(value) {
    let val
    if (typeof value === 'string') {
      val = `${value}`
    } else {
      val = value
    }
    this.props.onChange(val)
  }

  formatter = val => {
    const { precision = 2 } = this.props
    let value = val
    if (value) {
      value = `${value}`.replace(/[^.\-\d]/g, '')
      let precision1 = 0
      const valueStr = `${value}`
      const index = valueStr.indexOf('.')
      if (index >= 0) {
        precision1 = valueStr.length - valueStr.indexOf('.') - 1
      }
      if (precision1 > precision) {
        value = `${value}`.slice(0, index + 1 + precision)
      }
    }
    value = `${value}`.replace(/,/g, '')
    return value
  }

  renderDisabled = () => {
    const { href, value, render } = this.props
    let html = ''
    if (render) {
      html = render(value)
      html = isEmpty(html) ? <span className="fe-blank-holder">-</span> : html
    } else {
      html = (
        <span>
          {isEmpty(value) ? <span className="fe-blank-holder">-</span> : value}
        </span>
      )
    }
    if (href && !isEmpty(value)) {
      html = <Link to={href}>{html}</Link>
    }
    return html
  }

  render() {
    const {
      money = false,
      max = 10000000000000000,
      min = -Infinity,
      placeholder = '',
      disabled = false,
      inputWidth,
      addonBefore = '',
      addonAfter = '',
      readonly
    } = this.props

    const style = {}

    if (inputWidth) {
      style.width = inputWidth
    }

    if (addonBefore) {
      style.marginLeft = 4
    }

    if (addonAfter) {
      style.marginRight = 4
    }

    return (
      <div>
        <span>{addonBefore}</span>
        {disabled ? (
          this.renderDisabled()
        ) : (
          <AntdInputNumber
            style={style}
            disabled={readonly}
            max={+max}
            min={(typeof min === 'number' ? min : +min) || undefined}
            placeholder={placeholder}
            money={money}
            onChange={this.handleChange.bind(this)}
            value={this.state.value}
            formatter={val => {
              const value = this.formatter(val)
              return money ? formatMoney(value) : value
            }}
            parser={val => this.formatter(val)}
          />
        )}
        <span>{addonAfter}</span>
      </div>
    )
  }
}
