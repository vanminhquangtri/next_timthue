const { requestApi } = require('.');

const Blogs = {
    getBlogList: async () => requestApi(''),
    getBlogDetail: async (id) => requestApi('/' + id),
};

export default Blogs;
