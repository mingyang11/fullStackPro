import React, { Component } from 'react'
import { Row, Col } from 'antd'
import InputNumber from '../Number'

export default class NumberRange extends Component {
  constructor(props) {
    super(props)
    const value = props.value || []
    this.state = {
      startMin: props.startMin,
      endMin: props.endMin,
      startMax: props.startMax,
      endMax: props.endMax,
      value
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || []
      this.setState({
        ...this.state,
        value,
        endMin: value[0] || nextProps.endMin,
        startMax: value[1] || nextProps.endMin || 1000000000000000
      })
    }
  }

  onStartChange(value) {
    // value of array type the empty value is [], not [undefined, undefined] and so on.
    let values = []
    if (!this.isEmpty(value) || !this.isEmpty(this.state.value[1])) {
      values = [value, this.state.value[1]]
    }
    this.props.onChange(values)
  }

  onEndChange(value) {
    let values = []
    if (!this.isEmpty(value) || !this.isEmpty(this.state.value[0])) {
      values = [this.state.value[0], value]
    }
    this.props.onChange(values)
  }

  isEmpty = value => {
    if (value !== 0 && !value) {
      return true
    }
    return false
  }

  render() {
    const { startMin, endMax = 1000000000000000, value } = this.state
    const {
      disabled,
      placeholder,
      placeholderPrefix = [],
      reduce = 1
    } = this.props

    let ph1 = placeholder
    let ph2 = placeholder

    if (placeholderPrefix.length === 2) {
      ph1 = placeholderPrefix[0] + placeholder
      ph2 = placeholderPrefix[1] + placeholder
    }

    return (
      <Row span={24} className="number-range-container">
        {disabled && (
          <div className="fe-blank-holder">
            <span>{this.isEmpty(value[0]) ? '-' : value[0]}</span> ~{' '}
            <span>{this.isEmpty(value[1]) ? '-' : value[1]}</span>
          </div>
        )}
        {!disabled && (
          <div>
            <Col span={11}>
              <InputNumber
                min={startMin}
                max={endMax}
                placeholder={ph1}
                value={value[0]}
                onChange={this.onStartChange.bind(this)}
                reduce={reduce}
              />
            </Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              ~
            </Col>
            <Col span={11}>
              <InputNumber
                min={startMin}
                max={endMax}
                placeholder={ph2}
                value={value[1]}
                onChange={this.onEndChange.bind(this)}
                reduce={reduce}
              />
            </Col>
          </div>
        )}
      </Row>
    )
  }
}
