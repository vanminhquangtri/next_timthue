import axios from 'axios';
import Texts from 'src/constants/texts';

export const requestApi = async (
    pathApi,
    postData = Object(),
    formData = null
) =>
    axios({
        url: Texts.host + pathApi,
        method: Object['keys'](postData)['length'] || formData ? 'POST' : 'GET',
        data: postData,
        headers: {
            'Content-Type': formData
                ? 'multipart/form-data'
                : 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + 111111111111111,
        },
    })
        .then((result) => {
            return result.data;
        })
        .catch((error) => {
            if (!error.response) {
                // router.push('/503')
                // window.toastr.error('Bạn đã thực hiện thao tác quá nhanh, vui lòng thử lại!', 'Thông Báo') // Thông báo của 502
            }
            if (error.response) {
                return error.response.data;
            }
        });
