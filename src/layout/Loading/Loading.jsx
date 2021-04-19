import React from 'react';
import Images from 'src/constants/images';
import Image from 'next/image';
import styles from './Loading.module.scss';

const Loading = () => {
    return (
        <div id="loading-layout" className={`${styles.loading_layout}`}>
            <img
                src={Images.LoadingImage}
                alt="Loading"
                width={30}
                height={30}
                className={`${styles.loading_image}`}
            />
        </div>
    );
};

export default Loading;
