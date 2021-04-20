const logAction = {
    ADD_LOGS: (payload) => {
        return {
            type: 'ADD_LOGS',
            payload: payload,
        };
    },
};

export default logAction;
