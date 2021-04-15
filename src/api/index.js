import axios from 'axios';
import Texts from 'src/constants/texts';

export const requestApi = async (
    pathApi,
    data = Object({
        body: Object(),
        params: Object(),
    }),
    formData = null
) =>
    axios({
        url: Texts.host + pathApi,
        // data : {params:{}, body: {}}
        // params for get method
        // body for post method
        method:
            Object['keys'](data.body)['length'] || formData ? 'POST' : 'GET',
        data: data.body,
        params: data.params,
        headers: {
            'Content-Type': formData
                ? 'multipart/form-data'
                : 'application/json;charset=utf-8',
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLmF1dG9nb2xpa2UubmV0XC9hcGlcL2xvZ2luIiwiaWF0IjoxNjE4Mzk3NTM2LCJleHAiOjE2NDk5MzM1MzYsIm5iZiI6MTYxODM5NzUzNiwianRpIjoiWld6UFBUZ1hsdnpYdVdsZSIsInN1YiI6OSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Rg1GY2ft0rLz30b5eVFy_wBzhD0EIjGoprJRvo0nDaY',
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
