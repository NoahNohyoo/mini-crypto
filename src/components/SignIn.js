import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
const headers = { withCredentials: true };

const SignIn = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const [condition, setCondition] = useState(false);
    const toggle = () => setCondition(!condition);
    useEffect(() => {
    }, [condition]);

    // init input forms
    const initForms = () => {
        setInputEmail('');
        setInputPassword('');
    }

    const history = useHistory();
    const handleToMain = () => {
        history.push("/");
    }

    const goSignIn = async () => {

        if (inputEmail === "" || inputEmail === undefined) {
            alert("이메일 주소를 입력해주세요.");
            // document.querySelector("inputEmail").focus();
            return;
        } else if (inputPassword === "" || inputPassword === undefined) {
            alert("비밀번호를 입력해주세요.");
            // document.querySelector("inputPassword").focus();
            return;
        }

        const send_param = {
            headers,
            email: inputEmail,
            password: inputPassword
        };
        initForms();
        axios
            // .post("http://169.254.119.81:8080/miniUser/login", send_param)
            .post("https://mini-server.netlify.app/miniUser/login", send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data._id) {
                    console.log("login_id:" + returnData.data._id);
                    $.cookie("login_id", returnData.data._id, { expires: 1 });
                    $.cookie("login_seq", returnData.data.userSeq, { expires: 1 });
                    $.cookie("login_name", returnData.data.name, { expires: 1 });
                    // alert(returnData.data.message);
                    toggle();
                    handleToMain();
                } else {
                    alert(returnData.data.message);
                }
            })
            //에러
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
                            <h2 className="text-white mt-0">Sign in to Mini Crypto</h2>
                            <div className="mb-3 row">
                                <label htmlFor="exampleFormControlInput1" className="col-sm-2 col-form-label text-white">Email</label>
                                <div className="col-sm-8">
                                    <input autoFocus type="email" className="form-control" id="inputEmail" placeholder="name@example.com" value={inputEmail}
                                        onChange={e => setInputEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-white">Password</label>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control" id="inputPassword" value={inputPassword}
                                        onChange={e => setInputPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-8 ">
                                    <button type="button" className="btn btn-success" onClick={goSignIn}>SIGN IN</button>
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