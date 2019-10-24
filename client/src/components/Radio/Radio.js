import React, { Component } from 'react'
import { Radio as AntdRadio } from 'antd'

export default class Radio extends Component {
  onChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    const { data = {}, disabled, value } = this.props
    return (
      <div>
        {disabled && !value && <span className="fe-blank-holder">-</span>}
        {disabled && value && (
          <span className="fe-readonly">{data[value]}</span>
        )}
        {!disabled && (
          <AntdRadio.Group
            onChange={this.onChange.bind(this)}
            value={`${value}`}
          >
            {Object.keys(data).map(key => (
              <AntdRadio value={key} key={key}>
                {data[key]}
              </AntdRadio>
            ))}
          </AntdRadio.Group>
        )}
      </div>
    )
  }
}
