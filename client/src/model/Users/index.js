import { postLogin, postRegister, selectUsers } from '../../services/api';

export default {
  namespace: 'user_model',
  state: {
    loginResult: '',
    registerResult: '',
    userList: [],
  },
  effects: {
    *postLoginData({ payload, callback }, { call, put }) {
      const { reducer, ...rest } = payload;
      const response = yield call(postLogin, {
        ...rest,
      });
      yield put({
        type: reducer || 'fetchPublicReducer',
        payload: response,
        callback,
      });
    },
    *postRegister({ payload, callback }, { call, put }) {
      const { reducer, ...rest } = payload;
      const response = yield call(postRegister, {
        ...rest,
      });
      yield put({
        type: reducer || 'fetchPublicReducer',
        payload: response,
        callback,
      });
    },
    *getUserList({ payload, callback }, { call, put }) {
      const { reducer, ...rest } = payload;
      const response = yield call(selectUsers, {
        ...rest,
      });
      yield put({
        type: reducer || 'fetchPublicReducer',
        payload: response,
        callback,
      });
    },
  },
  reducers: {
    fetchPublicReducer(state, action) {
      const { callback, payload } = action;
      if (callback) callback(payload);
      return {
        ...state,
        resultData: payload,
      };
    },

    /* 登陆 */
    postHandleLogin(state, action) {
      const { callback, payload } = action;
      const loginResultStr = '';
      if (!payload.Success) {
        if (callback) callback(loginResultStr);
        return {
          ...state,
          loginResult: loginResultStr,
        };
      }
      loginResultStr = payload.Content.msg || '';
      if (callback) callback(loginResultStr);
      return {
        ...state,
        loginResult: loginResultStr,
      };
    },
    /* 注册 */
    postHandleLogin(state, action) {
      const { callback, payload } = action;
      const registerResultStr = '';
      if (!payload.Success) {
        if (callback) callback(registerResultStr);
        return {
          ...state,
          registerResult: registerResultStr,
        };
      }
      registerResultStr = payload.Content.msg || '';
      if (callback) callback(registerResultStr);
      return {
        ...state,
        registerResult: registerResultStr,
      };
    },
    /* 获取所有用户数据 */
    fetchUserList(state, action) {
      const { callback, payload } = action;
      let userList = [];
      if (!payload.Success) {
        if (callback) callback(userList);
        return {
          ...state,
          userList,
        };
      }
      userList = payload.Content || [];
      if (callback) callback(userList);
      return {
        ...state,
        userList,
      };
    },
  },
};
