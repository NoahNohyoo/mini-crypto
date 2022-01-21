import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'; // use
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
const headers = { withCredentials: true };

const Navigation = () => {
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [infoName, setInfoName] = useState('');
    const [infoEmail, setInfoEmail] = useState('');
    const [infoPassword, setInfoPassword] = useState('');

    const [condition, setCondition] = useState(false);
    const toggle = () => setCondition(!condition);
    useEffect(() => {
    }, [condition]);

    const history = useHistory();
    const handleToMain = () => {
        history.push("/");
    }
    const handleToWelcome = () => {
        history.push("/welcome");
    }

    const keyEnter = (e) => {
        if (e.code === "Enter") goSignUp();
    }

    const goSignUp = async () => {
        const joinName = inputName;
        const joinEmail = inputEmail;
        const joinPw = inputPassword;
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,16}$/;

        setInfoEmail("");
        setInfoName("");
        setInfoPassword("");
        if (joinName === "" || joinName === undefined) {
            setInfoName("Please enter your name.");
            return;
        } else if (joinEmail === "" || joinEmail === undefined) {
            setInfoEmail("Please enter a email.");
            return;
        } else if (
            joinEmail.match(regExp) === null ||
            joinEmail.match(regExp) === undefined
        ) {
            setInfoEmail("Please enter a valid email format.");
            setInputEmail("");
            return;
        } else if (joinPw === "" || joinPw === undefined) {
            setInfoPassword("Please enter a password.");
            return;
        } else if (
            joinPw.match(regExp2) === null ||
            joinPw.match(regExp2) === undefined
        ) {
            setInfoPassword("Please enter a password of 4 to 16 digits including numbers, letters and special characters.")
            setInputPassword("");
            return;
        }

        const send_param = {
            headers,
            email: joinEmail,
            name: joinName,
            password: joinPw
        };
        axios
            .post("http://174.6.121.176:8080/miniUser/join", send_param)
            .then(returnData => {
                if (returnData.data.message) {
                    if (returnData.data.dupYn === "1") {
                        setInfoEmail("Duplicate email. Please enter another email.");
                        setInputEmail("");
                    } else {
                        setInputName("");
                        setInputEmail("");
                        setInputPassword("");
                        $("[data-bs-dismiss=modal]").trigger({ type: "click" });
                        handleToWelcome();
                    }
                } else {
                    console.log("failed sign up");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const goSignOut = async () => {
        axios
            .get("http://174.6.121.176:8080/miniUser/logout", {
                headers
            })
            .then(returnData => {
                if (returnData.data.message) {
                    $.removeCookie("login_id");
                    $.removeCookie("login_seq");
                    $.removeCookie("login_name");
                    toggle();
                    handleToMain();
                }
            });
    }

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
                            <li className="nav-item" id="sign-out"><a className="nav-link me-lg-3" onClick={goSignOut} >Sign Out</a></li>
                        </ul>
                        <button id="get-started" className="btn btn-primary rounded-pill px-3 mb-02 mb-lg-0" data-bs-toggle="modal" data-bs-target="#startModal">
                            <span className="d-flex align-items-center">
                                <span className="small">Get started</span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
            {/* Sign up Modal */}
            <div className="modal fade" id="startModal" tabIndex="-1" aria-labelledby="startModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-gradient-primary-to-secondary p-4">
                            <h5 className="modal-title font-alt text-white" id="startModalLabel">Create account</h5>
                            <button className="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close" id="closeModal"></button>
                        </div>
                        <div className="modal-body border-0 p-4">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" value={inputName}
                                    onChange={e => setInputName(e.target.value)} onKeyPress={e => keyEnter(e)}
                                />
                                <label htmlFor="name">Full name*</label>
                                <div className="text-danger">{infoName}</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" value={inputEmail}
                                    onChange={e => setInputEmail(e.target.value)} onKeyPress={e => keyEnter(e)}
                                />
                                <label htmlFor="email">Email*</label>
                                <div className="text-danger">{infoEmail}</div>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="password" type="password" data-sb-validations="required" value={inputPassword}
                                    onChange={e => setInputPassword(e.target.value)} onKeyPress={e => keyEnter(e)}
                                />
                                <label htmlFor="password">Password*</label>
                                <div className="text-danger">{infoPassword}</div>
                            </div>
                            <div className="d-grid"><button className="btn btn-primary rounded-pill btn-lg" onClick={goSignUp}>Sign up</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation;