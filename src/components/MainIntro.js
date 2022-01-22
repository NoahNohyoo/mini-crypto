import React from 'react';
import MainList from './MainList';

const MainIntro = () => {
    return (
        <>
            {/* Intro area */}
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">Welcome to Mini Crypto!</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-4">Step 1) Look around a view crypto list.</p>
                            <p className="text-white-75 mb-4">Step 2) Sign up to get cyber money($1,000,000)</p>
                            <p className="text-white-75 mb-4">Step 3) Enjoy the trade and check your assets.</p>
                            <a className="btn btn-primary btn-xl" href="#list">VIEW CRYPTO LIST</a>
                        </div>
                    </div>
                </div>
            </header>
            <MainList />
        </>
    )

}

export default MainIntro;