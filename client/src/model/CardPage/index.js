// import request from '../../utils/request';
import request from "../../utils/requestPost";
const comonURL = '/dev'

function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

export default {
    namespace: 'page_card_model',
    state: {
        dataSource: [
            {
                id: 1,
                setup: 'Did you hear about the two silk worms in a race?',
                punchline: 'It ended in a tie',
            },
            {
                id: 2,
                setup: 'What happens to a frog\'s car when it breaks down?',
                punchline: 'It gets toad away',
            },
        ],
        counter: 100,
    },
    effects: {
        *getData({payload}, sagaEffects) {
            try {
                const { call, put } = sagaEffects;
                const url = comonURL + "/test";
                const data = yield call(request, {
                    method: 'get',
                    headers:{
                        'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
                    },
                    url,
                    data: {
                      firstName: 'Fred',
                      lastName: 'Flintstone'
                    }
                });

                yield put({
                    type: 'handleData',
                    payload: ({
                        data
                    })
                });
            } catch (error) {
                throw error
            }
        },
        *getDataTest({payload}, sagaEffects) {
            try {
                const { call, put } = sagaEffects;
                const url = "/api/users";
                const testData = yield call(request, url);

                yield put({
                    type: 'handleData',
                    payload: ({
                        testData
                    })
                });
            } catch (error) {
                throw error
            }
        },
    },
    reducers: {
        handleData(state, { payload: newCard }) {
            state.data = newCard.data;
            state.testData = newCard.testData;
            return state;
        },
        addNewCard(state, { payload: newCard }) {
            const nextCounter = state.counter + 1;
            const newCardWithId = { ...newCard, id: nextCounter };
            const nextData = state.dataSource.concat(newCardWithId);
            return {
                dataSource: nextData,
                counter: nextCounter,
            };
        }
    },
}