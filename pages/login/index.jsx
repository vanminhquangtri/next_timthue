import React, { useState } from 'react';
import Facebook from 'src/component/Login/Facebook';
import Google from 'src/component/Login/Google';

const Login = () => {
    const [useFb, setUseFb] = useState(false);
    return (
        <div>
            <div>
                <Google />
            </div>
            <div>
                <Facebook />
            </div>
        </div>
    );
};

export default Login;
