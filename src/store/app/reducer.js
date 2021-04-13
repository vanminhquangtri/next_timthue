const appState = {
    loading: false,
    signed_in: false,
};

const appReducer = (state = appState, action) => {
    console.log(`action`, action);
    switch (action.type) {
        case 'APP_SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_SIGNED_IN':
            return { ...state, signed_in: action.payload };
        default:
            return state;
    }
};

export default appReducer;

// dispatch action mean pass
/*
    1/ call the action type from file action.js and payload value
    store.dispatch(SET_LOADING(payload))
    2/ the reducer will check the style of action is SET_LOADING
    3/ reducer execute the case 
*/
