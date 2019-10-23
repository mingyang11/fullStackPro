import { postLogin, postRegister } from '../../services/api'
import router from 'umi/router'

export default {
  namespace: 'user_model',
  state: {
    loginResult: '',
    registerResult: ''
  },
  effects: {
    *postLoginData({ payload, callback }, { call, put }) {
      const { reducer, ...rest } = payload
      const response = yield call(postLogin, {
        ...rest
      })
      yield put({
        type: reducer || 'fetchPublicReducer',
        payload: response,
        callback
      })
    },
    *postRegisterData({ payload, callback }, { call, put }) {
      const { reducer, ...rest } = payload
      const response = yield call(postRegister, {
        ...rest
      })
      yield put({
        type: reducer || 'fetchPublicReducer',
        payload: response,
        callback
      })
    }
  },
  reducers: {
    fetchPublicReducer(state, action) {
      const { callback, payload } = action
      if (callback) callback(payload)
      return {
        ...state,
        resultData: payload
      }
    },

    /* 登陆 */
    postHandleLogin(state, action) {
      const { callback, payload } = action
      const loginResultStr = ''
      if (!payload.Success) {
        if (callback) callback(loginResultStr)
        return {
          ...state,
          loginResult: loginResultStr
        }
      }
      loginResultStr = payload.Content.msg || ''
      if (callback) callback(loginResultStr)
      return {
        ...state,
        loginResult: loginResultStr
      }
    },
    /* 注册 */
    postHandleLogin(state, action) {
      const { callback, payload } = action
      const registerResultStr = ''
      if (!payload.Success) {
        if (callback) callback(registerResultStr)
        return {
          ...state,
          registerResult: registerResultStr
        }
      }
      registerResultStr = payload.Content.msg || ''
      if (callback) callback(registerResultStr)
      return {
        ...state,
        registerResult: registerResultStr
      }
    }
  }
}
