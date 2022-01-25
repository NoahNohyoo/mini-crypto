/**************************************************************
 *  Author : Noah Noh
 *  Date : 13 Jan 2022
 * 
 *  - Common page displayed at the bottom
 * 
***************************************************************/

import React from 'react';

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className="bg-light py-5" >
                <div className="container px-4 px-lg-5">
                    <div className="small text-center text-muted">Copyright &copy; 2022 - Mini Crypto</div>
                    <div className="small text-center text-muted">(This demo site is for portfolio use only)</div>
                </div>
            </footer >
        </>
    )
}

export default Footer;