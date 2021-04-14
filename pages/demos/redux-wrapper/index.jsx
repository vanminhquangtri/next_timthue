import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from 'src/next-store';

const Page = ({ custom }) => (
    <div>
        <div>Prop from Redux</div>
        <div>Prop from getInitialProps: {custom}</div>
    </div>
);

export const getStaticProps = wrapper.getStaticProps(
    async ({ store, req, res, ...etc }) => {
        console.log('store.getState() :>> ', store.getState().tick);
        store.dispatch({ type: 'FOO', payload: 'Redux wrapper' }); // The component can read from the store's state when rendered
        console.log('store.getState() :>> ', store.getState().tick);
        return {
            props: {
                custom: store.getState().tick,
            },
        }; // You can pass some custom props to the component from here
    }
);

export default connect((state) => state)(Page);
