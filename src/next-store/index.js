import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// create your reducer
const reducer = (state = { tick: 'init' }, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                server: {
                    ...state.server,
                    ...action.payload.server,
                },
            };
        case 'SERVER_ACTION':
            return {
                ...state,
                server: {
                    ...state.server,
                    tick: action.payload,
                },
            };
        case 'CLIENT_ACTION':
            return {
                ...state,
                client: {
                    ...state.client,
                    tick: action.payload,
                },
            };
        case 'TICK':
            return { ...state, tick: action.payload };
        default:
            return state;
    }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
const wrapperConfig = {
    debug: true,
    storeKey: 'timthue',
};
export const wrapper = createWrapper(makeStore, wrapperConfig);
