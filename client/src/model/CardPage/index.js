import request from '../../utils/request';
const comonURL = '/dev'

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
                let data = yield call(request, url);
                console.log(data, 'data')
                yield put({
                    type: 'handleData',
                    payload: ({
                        data
                    })
                });
            } catch (error) {
                throw error
            }
            
        }
    },
    reducers: {
        handleData(state, { payload: newCard }) {
            state.data = newCard.data;
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