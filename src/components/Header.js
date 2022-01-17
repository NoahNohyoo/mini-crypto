import React from 'react';

const Header = () => {
    return (
        <>
            {/* Intro area */}
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">New portfolio in 2022</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!</p>
                            <a className="btn btn-primary btn-xl" href="#list">VIEW CRYPTO LIST</a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )

}

export default Header;