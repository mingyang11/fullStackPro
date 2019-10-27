import React from 'react'
import { Form, Input, Modal, Row, Button } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import createFormItem from '../createFormItem'
import mapPropsToFields from '../mapPropsToFields'
import onFieldsChange from '../onFieldsChange'

const FormItem = Form.Item

const ModalForm = Form.create({
  mapPropsToFields,
  onFieldsChange
})(props => {
  const {
    visible,
    onCancel,
    onCreate,
    title,
    fields,
    form,
    formWidth,
    cusTitle,
    children,
    validateDisabled,
    buttons = [],
    confirmLoading
  } = props
  const { getFieldDecorator, validateFields } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const save = () => {
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onCreate(values)
      }
    })
  }

  const isEdit = () => !!(props.values && props.values.id)

  const geneForm = flds => (
    <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={550}>
      <Form layout="horizontal">
        <FormItem label="" {...formItemLayout} style={{ display: 'none' }}>
          {getFieldDecorator('id', {})(<Input type="hidden" />)}
        </FormItem>
        <Row>
          {flds.map(item =>
            createFormItem({
              field: item,
              form,
              formItemLayout,
              validateDisabled,
              inputOpts: {}
            })
          )}
        </Row>
        {children && <Row style={{ marginBottom: 24 }}>{children}</Row>}
      </Form>
    </Scrollbars>
  )

  const butt = buttons.map(
    item =>
      !item.hidden && (
        <Button
          style={item.style}
          key={`button${item.label}`}
          type={item.type || 'primary'}
          onClick={(item.handleForm || item.onClick).bind(this, form)}
          disabled={item.disabled}
          loading={item.loading}
        >
          {item.label}
        </Button>
      )
  )

  return (
    <Modal
      width={formWidth || 1000}
      visible={visible}
      title={cusTitle || (isEdit() ? '修改' : '新增') + title}
      okText="保存"
      onCancel={onCancel}
      onOk={save}
      maskClosable={false}
      footer={
        butt.length > 0
          ? butt
          : [
              <Button
                key="submit"
                size="large"
                type="primary"
                onClick={save}
                loading={confirmLoading}
              >
                保存
              </Button>,
              <Button size="large" key="back" onClick={onCancel}>
                取消
              </Button>
            ]
      }
    >
      {geneForm(fields)}
    </Modal>
  )
})
export default ModalForm
