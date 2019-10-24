import React, { Component } from 'react'
import { DatePicker, Row, Col } from 'antd'
import moment from 'moment'

class DateRange extends Component {
  state = {
    endOpen: false,
    value: []
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value || []
      if (typeof value[0] !== 'object' && value[0]) {
        value[0] = moment(value[0])
      }
      if (typeof value[1] !== 'object' && value[1]) {
        value[1] = moment(value[1])
      }
      this.setState({
        ...this.state,
        value
      })
    }
  }

  onStartChange = value => {
    let values = []
    if (value || this.state.value[1]) {
      values = [value, this.state.value[1]]
    }
    this.props.onChange(values)
  }

  onEndChange = value => {
    let values = []
    if (value || this.state.value[0]) {
      values = [this.state.value[0], value]
    }
    this.props.onChange(values)
  }

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = open => {
    this.setState({ endOpen: open })
  }

  disabledStartDate = startValue => {
    const endValue = this.state.value[1]
    if (!startValue || !endValue) {
      return false
    }
    let res = startValue.valueOf() > endValue.valueOf()
    if (this.props.maxInterval && !res) {
      res = startValue.valueOf() < endValue.valueOf() - this.props.maxInterval
    }
    return res
  }

  disabledEndDate = endValue => {
    const startValue = this.state.value[0]
    if (!endValue || !startValue) {
      return false
    }
    let res = endValue.valueOf() <= startValue.valueOf()
    if (this.props.maxInterval && !res) {
      res = endValue.valueOf() >= startValue.valueOf() + this.props.maxInterval
    }
    return res
  }

  render() {
    const { value, endOpen } = this.state
    const {
      disabled = false,
      format = 'YYYY-MM-DD',
      showTime,
      placeholder = []
    } = this.props
    return (
      <Row span={24} className="date-range-container">
        {disabled && (
          <div className="fe-blank-holder">
            <span>{value[0] ? value[0].format(format) : '-'}</span> ~{' '}
            <span>{value[1] ? value[1].format(format) : '-'}</span>
          </div>
        )}
        {!disabled && (
          <div>
            <Col span={11}>
              <DatePicker
                disabledDate={this.disabledStartDate.bind(this)}
                format={format}
                showTime={showTime}
                value={value[0]}
                placeholder={placeholder[0]}
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
            </Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              <span> ~ </span>
            </Col>
            <Col span={11}>
              <DatePicker
                disabledDate={this.disabledEndDate.bind(this)}
                format={format}
                showTime={showTime}
                value={value[1]}
                placeholder={placeholder[1]}
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
            </Col>
          </div>
        )}
      </Row>
    )
  }
}

export default DateRange
