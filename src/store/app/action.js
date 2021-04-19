const appAction = {
    SET_APP_LOADING: (payload) => {
        console.log(`payload`, payload);
        return {
            type: 'SET_APP_LOADING',
            payload: payload,
        };
    },
    SET_SIGNED_IN: (payload) => {
        return {
            type: 'SET_SIGNED_IN',
            payload: payload,
        };
    },
};

export default appAction;
