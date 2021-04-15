import React from 'react';
import { connect } from 'react-redux';
import Log from '../../../src/api/log';
import cookies from 'next-cookies';
import Link from 'next/link';
import Slug from 'slug';
import { useRouter } from 'next/router';
import * as cookie from 'cookie';

const SearchResult = ({ logList }) => {
    const router = useRouter();
    const setCookieLogId = (log_id) => {
        if (log_id) {
            const expDuration = new Date(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            );
            document.cookie = `log_id=${log_id}; expires=${expDuration}`;
        }
    };
    return (
        <div>
            <div>Search Result</div>
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
    const parsedCookies = cookie.parse(ctx.req.headers.cookie);
    console.log('parsedCookies :>> ', parsedCookies);
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
}

export default connect((state) => state)(SearchResult);
