import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Texts from 'src/constants/texts';

const Google = () => {
    const responseGoogle = (response) => {
        console.log('response :>> ', response);
    };

    return (
        <div>
            <GoogleLogin
                clientId={Texts.google_client_id}
                buttonText="Đăng nhập bằng Gmail"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={false}
                cookiePolicy={'single_host_origin'}
            />
            <GoogleLogout
                clientId={Texts.google_client_id}
                buttonText="Logout"
                onLogoutSuccess={() => console.log('success')}
                onFailure={() => console.log('fail')}
            />
        </div>
    );
};

export default Google;
