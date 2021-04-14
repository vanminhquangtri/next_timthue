import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

// create your reducer
const reducer = (state = { tick: 'init' }, action) => {
    switch (action.type) {
        case 'TICK':
            return { ...state, tick: action.payload };
        case 'TOE':
            return { ...state, tick: action.payload };
        case 'FOO':
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
