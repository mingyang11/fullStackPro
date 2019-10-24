import React, { Component } from 'react'
import { DatePicker as AntdDatePicker } from 'antd'
import moment from 'moment'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    let value = props.value || undefined
    if (value) {
      value = moment(value)
    }
    this.state = { value }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      let value = nextProps.value || undefined
      if (value) {
        value = moment(value)
      }
      this.setState({ value })
    }
  }

  handleChange = value => {
    const { format = 'YYYY-MM-DD' } = this.props
    const time = value ? moment(value).format(format) : value
    this.props.onChange(time)
  }

  render() {
    const { value } = this.state
    return (
      <AntdDatePicker
        {...this.props}
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

export default DatePicker
