import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Log from '../../../src/api/log';
import cookies from 'next-cookies'; // lib này để get cookie trong SSR
import cookie from 'cookie'; // lib này để set cookie trong SSR
import Link from 'next/link';
import Slug from 'slug';
import { useCookies } from 'react-cookie'; // lib này có chức năng set cookie trong useffect
import { useRouter } from 'next/router';
import Texts from 'src/constants/texts';
import { useCookie } from 'next-cookie';

const SearchResult = ({ logList, limit }) => {
    const router = useRouter();
    const setCookieLogId = (log_id) => {
        if (log_id) {
            const expDuration = new Date(
                new Date().getTime() + Texts.expired_time_cookie
            );
            document.cookie = `log_id=${log_id}; expires=${expDuration}; path=/`;
        }
    };
    const [page, setPage] = useState(1);
    const [cookies, setCookie, removeCookie] = useCookies();

    const changePageCk = () => {
        const curPage = parseInt(cookies.page);
        setCookie('page', curPage + 1, {
            path: '/',
            expires: new Date(new Date().getTime() + Texts.expired_time_cookie),
        });
    };
    const moveToNextPage = () => {
        const curPage = parseInt(cookies.page);
        setCookie('page', curPage + 1, {
            path: '/',
            expires: new Date(new Date().getTime() + Texts.expired_time_cookie),
        });
        const query = router.query;
        query.page = parseInt(curPage) + 1;
        router.push({
            pathname: router.pathname,
            query: query,
        });
    };
    useEffect(() => {
        return () => {
            setCookie('page', 1, {
                path: '/',
                expires: new Date(
                    new Date().getTime() + Texts.expired_time_cookie
                ),
            });
            setCookie('current_log_list', [], {
                path: '/',
                expires: new Date(
                    new Date().getTime() + Texts.expired_time_cookie
                ),
            });
        };
    }, []);
    return (
        <div className="p-5">
            <div>
                <h2>Search Result</h2>
            </div>
            <div>
                {logList?.map((log, index) => {
                    return (
                        <div key={index}>
                            <h5 className="text-danger">{log?.id}</h5>
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
            {logList.length >= limit && (
                <button
                    className="btn btn-primary"
                    onClick={() => moveToNextPage()}
                >
                    Xem thêm
                </button>
            )}
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const cookie = useCookie(ctx);
    const cookieValues = cookie.cookie.cookies;
    const cookieOptions = {
        path: '/',
        expires: new Date(new Date().getTime() + Texts.expired_time_cookie),
    };
    const { action, page, limit } = ctx.query;
    const data = {
        params: {
            action,
            limit,
            page: page,
        },
        body: {},
    };
    const curLogs = cookieValues.current_log_list
        ? JSON.parse(cookieValues.current_log_list)
        : [];
    console.log('curLogs :>> ', curLogs);
    const response = await Log.getLogList(data);
    if (response?.success) {
        cookie.set(
            `current_log_list`,
            JSON.stringify(curLogs.concat(response?.data)),
            cookieOptions
        );
        console.log('curLogs :>> ', curLogs);
        return {
            props: {
                logList: [...curLogs, ...response?.data],
                limit,
            },
        };
    } else {
        return {
            notFound: true,
        };
    }
}

export default connect((state) => state)(SearchResult);
