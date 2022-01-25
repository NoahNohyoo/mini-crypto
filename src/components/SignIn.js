/**************************************************************
 *  Author : Noah Noh
 *  Date : 16 Jan 2022
 * 
 *  - The page displayed when you click or touch [Sign In] 
 *    on the top navigation bar
 *  - A page that provides a login function
 * 
***************************************************************/

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import * as config from "../config";
const headers = { withCredentials: true };

const SignIn = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [infoEmail, setInfoEmail] = useState('');
    const [infoPassword, setInfoPassword] = useState('');

    const [condition, setCondition] = useState(false);
    const toggle = () => setCondition(!condition);
    useEffect(() => {
    }, [condition]);

    // init input forms
    const initForms = () => {
        setInputEmail('');
        setInputPassword('');
        setInfoEmail('');
        setInfoPassword('');
    }

    const keyEnter = (e) => {
        if (e.code === "Enter") goSignIn();
    }

    const history = useHistory();
    const handleToTrade = () => {
        history.push("/trade");
    }

    const goSignIn = async () => {
        setInfoEmail('');
        setInfoPassword('');
        if (inputEmail === "" || inputEmail === undefined) {
            setInfoEmail("Please enter a email.");
            return;
        } else if (inputPassword === "" || inputPassword === undefined) {
            setInfoPassword("Please enter a password.")
            return;
        }

        const send_param = {
            headers,
            email: inputEmail,
            password: inputPassword
        };
        initForms();
        axios
            .post(`${config.SERVER_URL}/miniUser/login`, send_param)
            .then(returnData => {
                if (returnData.data._id) {
                    $.cookie("login_id", returnData.data._id, { expires: 1 });
                    $.cookie("login_seq", returnData.data.userSeq, { expires: 1 });
                    $.cookie("login_name", returnData.data.name, { expires: 1 });
                    toggle();
                    handleToTrade();
                } else {
                    setInfoPassword(returnData.data.message);
                }
            })
            .catch(err => {
                console.log(err);
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


    return (
        <>
            {/* Sign In */}
            <section className="page-section bg-primary">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="text-white mt-2">Sign in to Mini Crypto</h2>
                            <div className="mb-3 row mt-4">
                                <label htmlFor="exampleFormControlInput1" className="col-sm-2 col-form-label text-white ">Email</label>
                                <div className="col-sm-8">
                                    <input autoFocus type="email" className="form-control" id="inputEmail" placeholder="name@example.com" value={inputEmail}
                                        onChange={e => setInputEmail(e.target.value)} onKeyPress={e => keyEnter(e)}
                                    />
                                    <div className="text-white mt-2" >{infoEmail}</div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-white">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control" id="inputPassword" value={inputPassword}
                                        onChange={e => setInputPassword(e.target.value)} onKeyPress={e => keyEnter(e)}
                                    />
                                    <div className="text-white mt-2" >{infoPassword}</div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-8 ">
                                    <button type="button" className="btn btn-success rounded-pill px-5 mb-02 mb-lg-5" onClick={goSignIn}>SIGN IN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn;