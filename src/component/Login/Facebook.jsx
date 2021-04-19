import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import Texts from 'src/constants/texts';

const Facebook = () => {
    const handleResponse = (data) => {
        console.log(data);
    };
    const handleError = (error) => {
        console.log(error);
    };
    return (
        <div>
            <FacebookProvider appId={Texts.facebook_app_id}>
                <LoginButton
                    scope="email"
                    onCompleted={handleResponse}
                    onError={handleError}
                >
                    <span>Login via Facebook</span>
                </LoginButton>
            </FacebookProvider>
        </div>
    );
};

export default Facebook;
