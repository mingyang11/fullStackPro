import React, { Component } from 'react'
import { Checkbox as AntdCheckbox } from 'antd'
import PropTypes from 'prop-types'

export default class Radio extends Component {
  onChange(value) {
    this.props.onChange(value)
  }

  getDisplayValue = value => {
    const { data = {} } = this.props
    const options = data
    let displayValue = ''
    value.forEach(item => {
      displayValue = `${displayValue + options[item]} `
    })
    return displayValue
  }

  render() {
    const { data = {}, disabled, value = [] } = this.props
    return (
      <div>
        {disabled && value.length === 0 && (
          <span className="fe-blank-holder">-</span>
        )}
        {disabled && value.length > 0 && (
          <span className="fe-readonly">{this.getDisplayValue(value)}</span>
        )}
        {!disabled && (
          <AntdCheckbox.Group onChange={this.onChange.bind(this)} value={value}>
            {Object.keys(data).map(key => (
              <AntdCheckbox value={key} key={key}>
                {data[key]}
              </AntdCheckbox>
            ))}
          </AntdCheckbox.Group>
        )}
      </div>
    )
  }
}
