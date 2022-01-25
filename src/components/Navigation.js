/**************************************************************
 *  Author : Noah Noh
 *  Date : 13 Jan 2022
 * 
 *  - Common page displayed at the top
 *  - A page where you can choose which features to use
 * 
***************************************************************/

import React, { useState, useEffect } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'; // use
import { Link, NavLink } from 'react-router-dom';
import $ from "jquery";
import { } from "jquery.cookie";
import SignUp from './SignUp';
import SignOut from './SignOut';

const Navigation = () => {
    const [condition, setCondition] = useState(false);
    const toggle = () => setCondition(!condition);
    useEffect(() => {
    }, [condition]);

    useEffect(() => {
        if ($.cookie("login_id")) {
            $("#sign-in").hide();
            $("#get-started").hide();
            $("#sign-out").show();
            $("#my-assets").show();
            $("#my-assets-tag").text($.cookie("login_name") + "'s Assets");
        } else {
            $("#sign-out").hide();
            $("#my-assets").hide();
            $("#sign-in").show();
            $("#get-started").show();
        }
    })

    window.addEventListener('DOMContentLoaded', event => {

        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.body.querySelector('.navbar-toggler');
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map(function (responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });

    });

    return (
        <>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 navbar-shrink" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/">Mini Crypto</Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <li className="nav-item"><NavLink className="nav-link" to="/trade">Trade</NavLink></li>
                            <li className="nav-item" id="sign-in"><NavLink className="nav-link me-lg-3" to="/signIn">Sign in</NavLink></li>
                            <li className="nav-item" id="my-assets"><NavLink className="nav-link me-lg-3" to="/myAssets" id="my-assets-tag"></NavLink></li>
                            <li className="nav-item" id="sign-out"><SignOut toggle={toggle} /></li>
                        </ul>
                        <button id="get-started" className="btn btn-primary rounded-pill px-3 mb-02 mb-lg-0" data-bs-toggle="modal" data-bs-target="#startModal">
                            <span className="d-flex align-items-center">
                                <span className="small">Get started</span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
            <SignUp />
        </>
    )
}

export default Navigation;