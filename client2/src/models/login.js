import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { fakeAccountLogin } from '@/services/api';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'loginResult',
        payload: response,
      });
      if (response.Succ) {
        router.push('/');
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
    loginResult(state, { payload }) {
      return { ...state, result: payload };
    },
  },
};
export default Model;
