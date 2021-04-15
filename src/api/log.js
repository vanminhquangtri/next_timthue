const { requestApi } = require('.');

const Log = {
    getLogList: async (data) => requestApi('/api/logs', data),
};

export default Log;
