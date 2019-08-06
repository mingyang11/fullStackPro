import { stringify } from 'qs';
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/v2/login', {
    method: 'POST',
    data: params,
  });
}
