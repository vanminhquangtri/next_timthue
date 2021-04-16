import React from 'react';
import { connect } from 'react-redux';
import Log from '../../../src/api/log';
import cookies from 'next-cookies';

const SearchResultDetail = ({ log }) => {
    console.log('log :>> ', log);
    return (
        <div>
            <div>
                <h2>Result Detail</h2>
            </div>
            <div>
                <h6>{log?.id}</h6>
                <h6>{log?.username}</h6>
                <h5 className="text-primary">{log?.description}</h5>
            </div>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const allCookies = cookies(ctx);
    if (allCookies) {
        const data = {
            params: {
                action: allCookies.action,
                limit: 10,
                id: allCookies.log_id,
            },
            body: {},
        };
        const response = await Log.getLogList(data);
        if (response) {
            const log = response.data.find((log) => {
                return log.id == allCookies.log_id;
            });
            return {
                props: {
                    log,
                },
            };
        }
    }
}

export default connect((state) => state)(SearchResultDetail);
