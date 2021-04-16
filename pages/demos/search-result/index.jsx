import React from 'react';
import { connect } from 'react-redux';
import Log from '../../../src/api/log';
import cookies from 'next-cookies';
import Link from 'next/link';
import Slug from 'slug';

const SearchResult = ({ logList }) => {
    const setCookieLogId = (log_id) => {
        if (log_id) {
            const expDuration = new Date(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            );
            document.cookie = `log_id=${log_id}; expires=${expDuration}; path=/`;
        }
    };
    return (
        <div>
            <div>
                <h2>Search Result</h2>
            </div>
            <div>
                {logList?.map((log, index) => {
                    return (
                        <div key={index}>
                            <h5>{log?.username}</h5>
                            <Link
                                href={`/demos/search-result/${Slug(
                                    log?.description
                                )}`}
                            >
                                <a onClick={() => setCookieLogId(log?.id)}>
                                    {log?.description}
                                </a>
                            </Link>
                        </div>
                    );
                })}
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
            },
            body: {},
        };
        const response = await Log.getLogList(data);
        if (response) {
            return {
                props: {
                    logList: response.data,
                },
            };
        }
    }
}

export default connect((state) => state)(SearchResult);
