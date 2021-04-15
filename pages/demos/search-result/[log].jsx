import React from 'react';
import { connect } from 'react-redux';
import Log from '../../../src/api/log';
import cookies from 'next-cookies';

const SearchResultDetail = ({ logList }) => {
    console.log('logList :>> ', logList);
    return (
        <div>
            <div>Search Result</div>
            <div>
                {logList?.map((log, index) => {
                    return <h5 key={index}>{log?.username}</h5>;
                })}
            </div>
        </div>
    );
};

SearchResultDetail.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    console.log('allCookies :>> ', allCookies);
    if (allCookies) {
        const data = {
            params: {
                action: allCookies.action,
                limit: 10,
            },
            body: {},
        };
        console.log('data :>> ', data);
        const response = await Log.getLogList(data);
        console.log('response :>> ', response);
        if (response) {
            return {
                props: {
                    logList: response.data,
                },
            };
        }
    }
};

export default connect((state) => state)(SearchResultDetail);
