import request from '../../utils/request'
import requestAxios from '../../utils/requestAxios'

export async function deleteAclSetting(params) {
  const response = request(`${v2}/login`, {
    method: 'POST',
    body: params
  })
  return checkCode(response)
}

export async function postWorkflowData(params) {
  const response = requestAxios(`${v2}/register`, {
    method: 'POST',
    body: params
  })
  return checkCode(response)
}
