import { notification } from 'antd'

const v2 = '/api/v2'
const v3 = '/api/v3'
const checkCode = response =>
  response.then(data => {
    const { Success } = data
    switch (Success) {
      case true:
        return data
      case false:
        notification.error({
          message: data.ErrorMessage
        })
        return data
      default:
        return data
    }
  })

export { v2, v3, checkCode }
