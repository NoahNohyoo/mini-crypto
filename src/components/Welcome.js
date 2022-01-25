/**************************************************************
 *  Author : Noah Noh
 *  Date : 16 Jan 2022
 * 
 *  - Welcome page after signup
 * 
***************************************************************/

import React from 'react';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
    const history = useHistory();
    const handleToSignIn = () => {
        history.push("/signIn");
    }
    return (
        <>
            {/* Welcome */}
            <section className="page-section bg-primary">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-6 text-center mt-2">
                            <h2 className="text-white mb-lg-3 mt-2">Sign up is complete!</h2>
                            <h2 className="text-white mb-lg-3 mt-2">Please sign in to use.</h2>
                            <div>
                                <button className="btn btn-success rounded-pill px-5 mb-02 mb-lg-5 mt-2" onClick={handleToSignIn}>SIGN IN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Welcome;