import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
    const router = useRouter();
    const [data, setData] = useState({
        action: '',
        // password: '',
    });
    const limit = 5;
    const page = 1;
    const changeData = (ev) => {
        setData((prev) => {
            return {
                ...prev,
                [ev.target.name]: ev.target.value,
            };
        });
    };
    const Find = async (e) => {
        e.preventDefault();
        if (data.action !== '') {
            // save cookie 30 days
            const expDuration = new Date(
                new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            );
            document.cookie = `action=${data.action}; expires=${expDuration}; path =/`;
            document.cookie = `page=${1}; expires=${expDuration}; path =/`;
            moveToSearchResult();
        }
    };
    const moveToSearchResult = () => {
        const query = {
            action: data.action,
            limit,
            page,
        };
        router.push({
            pathname: '/demos/search-result',
            query,
        });
    };
    return (
        <div>
            <form onSubmit={(e) => Find(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="action"
                        onChange={(ev) => changeData(ev)}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={(ev) => changeData(ev)}
                    />
                </div> */}

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Search;
