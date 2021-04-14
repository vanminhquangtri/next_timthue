import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Search = () => {
    const router = useRouter();
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const changeData = (ev) => {
        setData((prev) => {
            return {
                ...prev,
                [ev.target.name]: ev.target.value,
            };
        });
    };
    const login = async (e) => {
        e.preventDefault();
        const cfg = {
            url: 'https://api.autogolike.net/api/login',
            method: 'post',
            data: data,
        };
        const response = await axios(cfg);
        console.log('response :>> ', response);
    };
    return (
        <div>
            <form onSubmit={(e) => login(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={(ev) => changeData(ev)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={(ev) => changeData(ev)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Search;
