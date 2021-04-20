import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Log from '../../../src/api/log';
import cookies from 'next-cookies';
import Link from 'next/link';
import Slug from 'slug';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Texts from 'src/constants/texts';

const SearchResult = ({ logList, limit }) => {
    console.log('limit :>> ', limit);
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
        };
    }, []);
    return (
        <div>
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
    const allCookies = cookies(ctx);
    const { action, page, limit } = ctx.query;
    if (allCookies) {
        const data = {
            params: {
                action,
                limit,
                page: page,
            },
            body: {},
        };
        const response = await Log.getLogList(data);
        if (response) {
            return {
                props: {
                    logList: response.data,
                    limit,
                },
            };
        }
    }
}

export default connect((state) => state)(SearchResult);
