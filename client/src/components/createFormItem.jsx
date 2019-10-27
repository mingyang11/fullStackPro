/* eslint-disable no-nested-ternary */
import React from 'react'
import { Input, Form, Col, Tooltip, Icon } from 'antd'
// import Address from './Address';
import Captcha from './Captcha'
import CommonDatePicker from './DatePicker'
import CommonDateRange from './DateRange'
import ImagePicker from './ImagePicker'
import AutoComplete from './Input'
import MonthPicker from './MonthPicker'
import MonthRange from './MonthRange'
import InputNumber from './Number'
import NumberRange from './NumberRange'
import Radio from './Radio'
import Checkbox from './Checkbox'
import Search from './Search'
import CommonSelect from './Select'
import MapView from './Map'
import TextArea from './TextArea'

// import './style.less'

const FormItem = Form.Item

const shapeSelectData = field => {
  const data = field.data
  const valueName = field.valueName || 'id'
  const displayName = field.displayName || 'label'
  let res = []
  if (Object.prototype.toString.call(data) === '[object Object]') {
    Object.keys(data).forEach(item => {
      const itemObj = {}
      itemObj[valueName] = item
      itemObj[displayName] = data[item]
      res.push(itemObj)
    })
  } else {
    res = data
  }
  return res
}

const components = {
  default: (field, defaultOpts) => (
    <field.component {...defaultOpts} {...field} />
  ),
  html: field => field.html,
  date: (field, defaultOpts) => (
    <CommonDatePicker
      {...defaultOpts}
      format="YYYY-MM-DD"
      onChange={field.onChange}
      disabledDate={field.disabledDate}
    />
  ),
  //   address: (field, defaultOpts) => (
  //     <Address
  //       {...defaultOpts}
  //       displayValue={field.displayValue}
  //       changeOnSelect={!!field.changeOnSelect}
  //       data={field.data}
  //     />
  //   ),
  datetime: (field, defaultOpts) => (
    <CommonDatePicker
      {...defaultOpts}
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
    />
  ),
  dateRange: (field, defaultOpts) => (
    <CommonDateRange
      {...defaultOpts}
      format="YYYY-MM-DD"
      maxInterval={field.maxInterval}
    />
  ),
  month: (field, defaultOpts) => <MonthPicker {...defaultOpts} />,
  datetimeRange: (field, defaultOpts) => (
    <CommonDateRange
      {...defaultOpts}
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      maxInterval={field.maxInterval}
    />
  ),
  monthRange: (field, defaultOpts) => <MonthRange {...defaultOpts} />,
  select: (field, defaultOpts) => (
    <CommonSelect
      {...defaultOpts}
      action={field.action}
      data={shapeSelectData(field)}
      multiple={field.multiple}
      valueName={field.valueName}
      displayName={field.displayName}
      onSelect={field.onSelect}
      showSearch={field.showSearch}
      allowClear={!field.required}
      page={field.page}
      inputWidth={field.inputWidth}
      addonBefore={field.addonBefore}
      addonAfter={field.addonAfter}
    />
  ),
  checkbox: (field, defaultOpts) => (
    <Checkbox {...defaultOpts} data={field.data} />
  ),
  image: (field, defaultOpts) => (
    <ImagePicker
      {...defaultOpts}
      data={field.data}
      tokenSeparators={field.tokenSeparators}
      action={field.action}
      width={field.width}
      height={field.height}
      token={field.token}
      getUrl={field.getUrl}
      single={field.single}
    />
  ),
  password: (field, defaultOpts) => <Input type="password" {...defaultOpts} />,
  number: (field, defaultOpts) => (
    <InputNumber
      {...defaultOpts}
      max={field.max}
      min={field.min}
      money={field.money}
      reduce={field.reduce}
      inputWidth={field.inputWidth}
      addonBefore={field.addonBefore}
      addonAfter={field.addonAfter}
      precision={field.precision}
      render={field.render}
      readonly={field.readonly}
    />
  ),
  textarea: (field, defaultOpts) => (
    <TextArea
      {...defaultOpts}
      max={field.max}
      autosize={{ minRows: 2, maxRows: 6 }}
    />
  ),
  radio: (field, defaultOpts) => <Radio {...defaultOpts} data={field.data} />,
  numberRange: (field, defaultOpts) => (
    <NumberRange
      {...defaultOpts}
      startMin={field.startMin}
      endMin={field.endMin}
      startMax={field.startMax}
      endMax={field.endMax}
      placeholderPrefix={field.placeholderPrefix}
      reduce={field.reduce}
    />
  ),
  captcha: (field, defaultOpts) => (
    <Captcha {...defaultOpts} size={field.size} onClick={field.onClick} />
  ),
  search: (field, defaultOpts) => (
    <Search {...defaultOpts} onSearch={field.onSearch} />
  ),
  map: (field, defaultOpts) => <MapView {...defaultOpts} />,
  text: (field, defaultOpts) => (
    <AutoComplete
      {...defaultOpts}
      allowClear
      inputWidth={field.inputWidth}
      addonBefore={field.addonBefore}
      addonAfter={field.addonAfter}
      href={field.href}
      render={field.render}
      readonly={field.readonly}
    />
  )
}

export const geneBox = (fld, opts = {}) => {
  const field = fld

  field.label = field.label || ''

  // deal with placeholder
  const phMap = {
    date: '请选择日期',
    // address: '请选择地址',
    datetime: '请选择时间',
    dateRange: ['请选择开始日期', '请选择结束日期'],
    month: '请选择月份',
    datetimeRange: ['请选择开始时间', '请选择结束时间'],
    monthRange: ['请选择开始月份', '请选择结束月份'],
    select: `请选择${field.label}`,
    radio: `请选择${field.label}`,
    checkbox: `请选择${field.label}`
  }
  let placeholder =
    field.placeholder ||
    phMap[field.type] ||
    `请输入${field.label.replace(/\(.*\)/, '')}`
  placeholder = field.disabled || field.readonly ? '-' : placeholder

  // combine with options from outside
  const defaultOpts = {
    size: 'default',
    ...opts,
    disabled: field.disabled,
    name: field.name,
    label: field.label,
    placeholder
  }

  if (field.onChange) {
    defaultOpts.onChange = field.onChange
  }

  const type = field.component ? 'default' : field.type || 'text'

  return components[type](field, defaultOpts)
}

// layout, provide three mode, default/simple/long, or you can change it as you like
const doLayout = (field, itemLayout, csp) => {
  let fil = itemLayout
    ? {
        labelCol: {
          span: itemLayout.labelCol.span
        },
        wrapperCol: {
          span: itemLayout.wrapperCol.span
        }
      }
    : {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 7
        }
      }

  let cs = csp || 24

  if (field.long) {
    cs = 24
    fil = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      }
    }
  }

  if (field.simple) {
    cs = 24
    fil = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    }
  }

  if (field.double) {
    cs = 12
    fil = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 14
      }
    }
    if (field.double === 'right') {
      fil.pull = true
    }
  }

  if (field.type === 'title') {
    cs = 24
    fil = {}
  }
  typeof field.colSpan === 'number' && (cs = field.colSpan)
  typeof field.labelSpan === 'number' && (fil.labelCol.span = field.labelSpan)
  typeof field.wrapperSpan === 'number' &&
    (fil.wrapperCol.span = field.wrapperSpan)
  return {
    fil,
    cs
  }
}

const addRequiredRule = (field, msgLabel, rules) => {
  if (field.required) {
    let msgPefix = '请输入'
    if (
      [
        'date',
        'datetime',
        'dateRange',
        'datetimeRange',
        'select',
        'radio',
        'checkbox'
      ].indexOf(field.type) > -1
    ) {
      msgPefix = '请选择'
    }
    if (field.type === 'image') {
      msgPefix = '请上传'
    }

    const rule = {
      required: true,
      message: field.requiredMsg || `${msgPefix}${msgLabel}`
    }

    if (!field.type || field.type === 'textarea') {
      rule.whitespace = true
    }

    if (field.type === 'map') {
      rule.required = false
    }

    rules.push(rule)
  }
}

const addMMNumberRule = (field, msgLabel, rules) => {
  const transform = v => {
    if (typeof v === 'number') {
      return `${v}`
    }
    return v
  }
  if (typeof field.max === 'number') {
    rules.push({
      max: field.max,
      message: `${msgLabel}最大为${field.max}位`,
      transform
    })
  }
  if (typeof field.min === 'number') {
    rules.push({
      min: field.min,
      message: `${msgLabel}最小为${field.min}位`,
      transform
    })
  }
}

const addMMOtherRule = (field, msgLabel, rules) => {
  if (typeof field.max === 'number') {
    rules.push({
      validator: (rule, value, cbc) => {
        if (value && field.max < +value) {
          cbc(`${msgLabel}最大为${field.max}`)
        }
        cbc()
      }
    })
  }
  if (typeof field.min === 'number') {
    rules.push({
      validator: (rule, value, cbc) => {
        if (value && field.min > +value) {
          cbc(`${msgLabel}最小为${field.min}`)
        }
        cbc()
      }
    })
  }
}

const addMinMaxRule = (field, msgLabel, rules) => {
  if (field.type !== 'number') {
    if (field.length) {
      const [minLength, maxLength] = field.length
      rules.push({
        validator: (rule, val, cbk) => {
          const value = (val || '').toString()
          if (value && (value.length < minLength || value.length > maxLength)) {
            cbk(`${msgLabel}为${minLength}~${maxLength}位`)
          }
          cbk()
        }
      })
    } else {
      addMMNumberRule(field, msgLabel, rules)
    }
  } else if (field.type === 'number') {
    addMMOtherRule(field, msgLabel, rules)
  }
}

const addShortcutRule = (field, rules) => {
  if (field.pattern) {
    rules.push({ pattern: field.pattern, message: field.patternMsg })
  }
  if (field.phone) {
    rules.push({
      pattern: /^1[34578][0-9]{9}$/,
      message: '请输入正确的手机格式'
    })
  }
  if (field.number) {
    rules.push({ pattern: /^\d+$/, message: '请输入数字' })
  }
  if (field.ID) {
    rules.push({
      pattern: new RegExp(
        `${/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|/.source}
          ${
            /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
              .source
          }`
      ),
      message: '身份证格式有误'
    })
  }
  if (field.char) {
    rules.push({
      pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$/,
      message: '请输入字母+数字'
    })
  }
  if (field.charLimit) {
    rules.push({
      pattern: /^[\w\u4e00-\u9fa5]*$/,
      message: '请输入中文、字母、数字或下划线'
    })
  }
}

// rule
const doRule = fld => {
  const field = fld
  if (!field.max && !field.component && !field.type) {
    field.max = 120 // default max length
  }
  const rules = []
  if (field.disabled || field.readonly || (field.hidden && !field.search)) {
    // makesure if the same name field switch the value is invalid, it seems to get the value at the first time
    rules.push({
      required: false
    })
  } else {
    let msgLabel = ''
    if (typeof field.label === 'string') {
      msgLabel = field.label.replace(/\(.*\)/, '')
    }

    if (!msgLabel) {
      msgLabel = field.cname || field.placeholder
    }

    if (field.validator) {
      rules.push({ validator: field.validator })
    }

    // required
    addRequiredRule(field, msgLabel, rules)

    // min, max, number is different
    addMinMaxRule(field, msgLabel, rules)

    // shortcut rule
    addShortcutRule(field, rules)
  }

  return rules
}

const doStyle = field => {
  // combine style and set hidden
  let styles = {}
  if (!field.search && field.hidden) {
    styles.display = 'none'
  }
  if (field.style) {
    styles = {
      ...styles,
      ...field.style
    }
  }
  return styles
}

const doValidate = (field, form, validateDisabled) => {
  const { getFieldError, isFieldTouched } = form
  let fieldError = getFieldError(field.name)
  if (validateDisabled) {
    fieldError = isFieldTouched(field.name) && fieldError
  }
  const validateStatus = fieldError ? 'error' : ''
  return {
    validateStatus,
    help: fieldError || ''
  }
}

const createFormItem = opts => {
  const { field, form } = opts

  let { formItemLayout, colSpan } = opts

  // just compatible with the low version
  if (field.dataIndex) {
    field.name = field.dataIndex
  }
  if (field.title) {
    field.label = field.title
  }

  const layout = doLayout(field, formItemLayout, colSpan)
  formItemLayout = layout.fil
  colSpan = layout.cs

  const styles = doStyle(field)

  // special class
  let className = (field.className && `${field.className}-form-item`) || ''
  if (!field.label) {
    className += ' item-no-required'
    if (!('colon' in field)) {
      field.colon = false
    }
  }

  if (field.float) {
    className += ' form-item-float'
  }

  let children
  if (field.type === 'title') {
    children = (
      <Col span={24} key={field.label} style={styles}>
        <div className={`ant-form-title ${className}`}>
          {typeof field.label === 'object' ? field.label : `${field.label}`}
        </div>
      </Col>
    )
  } else if (field.type === 'custom') {
    children = field.children
  }

  const createInner = fld => (
    <FormItem
      key={fld.name}
      labelCol={!fld.float ? formItemLayout.labelCol : undefined}
      wrapperCol={!fld.float ? formItemLayout.wrapperCol : undefined}
      label={
        fld.help ? (
          <span>
            {fld.label}&nbsp;
            <Tooltip title={fld.help}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        ) : (
          fld.label
        )
      }
      className={
        fld.items
          ? `${className} form-item-group`
          : `${className} ${fld.className}`
      }
      style={{
        ...styles,
        float: fld.float ? 'left' : '',
        clear: fld.clear ? 'left' : ''
      }}
      colon={'colon' in fld ? fld.colon : !!fld.label}
      extra={fld.extra}
      {...doValidate(fld, form, opts.validateDisabled)}
    >
      {fld.items &&
        fld.items.map(item => {
          const newItem = { ...item }
          newItem.className = `${newItem.className || ''} form-item-item`
          return createInner(newItem)
        })}
      {!fld.items &&
        form.getFieldDecorator(fld.name, {
          rules: doRule(fld),
          initialValue: fld.initialValue
        })(geneBox(fld, { form }))}
    </FormItem>
  )

  return field.type === 'title' ? (
    children
  ) : field.float ? (
    createInner(field)
  ) : (
    <Col span={colSpan} key={field.name} pull={formItemLayout.pull && 2}>
      {createInner(field)}
    </Col>
  )
}

export default createFormItem
