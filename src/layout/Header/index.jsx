import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="container-fluid bg-primary text-white" id="header">
            <div className="row">
                <div className="col-12">
                    <div>
                        <div>
                            <Link href="/demos/search">
                                <a>Search</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
