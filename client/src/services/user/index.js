import { stringify } from 'qs';
import request from '../../utils/request';
import requestAxios from '../../utils/requestAxios';
import { v2, checkCode } from '../config';

export async function postLogin(params) {
  const response = request(`${v2}/login`, {
    method: 'POST',
    body: params,
  });
  return checkCode(response);
}

export async function postRegister(params) {
  const response = requestAxios(`${v2}/register`, {
    method: 'POST',
    body: params,
  });
  return checkCode(response);
}

export async function selectUsers(params) {
  const response = request(`${v2}/user/list?${stringify(params)}`);
  return checkCode(response);
}
