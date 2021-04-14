import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from 'src/next-store';

export const getStaticProps = wrapper.getStaticProps(({ store, preview }) => {
    console.log('2. Page.getStaticProps uses the store to dispatch things');
    store.dispatch({
        type: 'TICK',
        payload: 'was set in other page ' + preview,
    });
});

const ReduxWrapper = () => {
    return <div>ReduxWrapper</div>;
};

export default ReduxWrapper;
