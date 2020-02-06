import React, { Fragment, useState } from 'react'
import { Card, Icon, Modal } from 'antd'

const ModalCard = props => {
  const { title, size = 'small' } = props
  const [modalVisible, setModalVisible] = useState(false)

  function openModal() {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Fragment>
      <Card
        title={title}
        size={size}
        extra={
          <Icon
            type="fullscreen"
            onClick={() => {
              openModal()
            }}
          />
        }
      >
        qwr
      </Card>

      <Modal
        title={title}
        visible={modalVisible}
        onOk={() => {
          closeModal()
        }}
        onCancel={() => {
          closeModal()
        }}
        width={document.body.clientWidth * 0.6}
      >
        hello
      </Modal>
    </Fragment>
  )
}

export default ModalCard
