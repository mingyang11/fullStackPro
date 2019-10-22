import { getTest } from '../../services/api'

export default {
  namespace: 'page_card_model',
  state: {},
  effects: {
    *deleteAclSetting({ payload, callback }, { call, put }) {
      const { reducer, ...rest } = payload
      const response = yield call(deleteAclSetting, {
        ...rest
      })
      yield put({
        type: reducer || 'fetchPublicStatus',
        payload: response,
        callback
      })
    }
  },
  reducers: {
    fetchPublicStatus(state, action) {
      const { callback, payload } = action
      if (callback) callback(payload)
      return {
        ...state,
        getAccountData: payload
      }
    },

    /* getAccountList开始 */
    fetchAccountList(state, action) {
      const { callback, payload } = action
      const FAccountList = []
      if (!payload.Success) {
        if (callback) callback(FAccountList)
        return {
          ...state,
          FAccountList
        }
      }
      const content = payload.Content
      if (callback) callback(content)
      return {
        ...state,
        FAccountList: content
      }
    }
  }
}
