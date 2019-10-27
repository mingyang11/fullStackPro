import React, { Component } from 'react'
import { Input as AntdInput, Icon } from 'antd'
import Link from 'umi/link'
import { isEmpty } from '../utils'
// import './style.less'

export default class Input extends Component {
  constructor(props) {
    super(props)
    let value = props.value
    if (typeof value === 'number') {
      value = `${value}`
    }
    this.state = { value: value || undefined }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      let value = nextProps.value
      if (typeof value === 'number') {
        value = `${value}`
      }
      this.setState({ value: value || undefined })
    }
  }

  handleChange(value) {
    this.props.onChange(value)
  }

  emitEmpty = () => {
    this.handleChange('')
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
      addonBefore = '',
      addonAfter = '',
      inputWidth,
      allowClear,
      value = '',
      placeholder,
      disabled,
      readonly
    } = this.props

    const suffix =
      allowClear && value !== '' ? (
        <Icon type="close-circle" onClick={this.emitEmpty} />
      ) : (
        <span />
      )
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
          <AntdInput
            disabled={readonly}
            placeholder={placeholder}
            style={style}
            suffix={readonly ? null : suffix}
            title={this.state.value}
            value={this.state.value}
            onChange={e => {
              this.handleChange(e.target.value)
            }}
          />
        )}
        <span>{addonAfter}</span>
      </div>
    )
  }
}
