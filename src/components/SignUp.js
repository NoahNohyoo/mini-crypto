import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import * as config from "../config";
const headers = { withCredentials: true };

const SignUp = () => {
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');
    const [infoName, setInfoName] = useState('');
    const [infoEmail, setInfoEmail] = useState('');
    const [infoPassword, setInfoPassword] = useState('');

    const history = useHistory();
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
        const joinRePw = inputRePassword;
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,16}$/;

        setInfoEmail("");
        setInfoName("");
        setInfoPassword("");
        if (joinName === "" || joinName === undefined) {
            setInfoName("Please enter your name.");
            return;
        } else if (joinEmail === "" || joinEmail === undefined) {
            setInfoEmail("Please enter your email.");
            return;
        } else if (
            joinEmail.match(regExp) === null ||
            joinEmail.match(regExp) === undefined
        ) {
            setInfoEmail("Please enter a correct email address.");
            setInputEmail("");
            return;
        } else if (joinPw === "" || joinPw === undefined || joinRePw === "" || joinRePw === undefined) {
            setInfoPassword("Please enter your password.");
            return;
        } else if (joinPw !== joinRePw) {
            setInfoPassword("Passwords do not match .")
            setInputPassword("");
            setInputRePassword("");
            return;
        } else if (
            joinPw.match(regExp2) === null ||
            joinPw.match(regExp2) === undefined
        ) {
            setInfoPassword("Please enter a password of 4 to 16 digits including numbers, letters and special characters.")
            setInputPassword("");
            setInputRePassword("");
            return;
        }

        const send_param = {
            headers,
            email: joinEmail,
            name: joinName,
            password: joinPw
        };
        axios
            .post(`${config.SERVER_URL}/miniUser/join`, send_param)
            .then(returnData => {
                if (returnData.data.message) {
                    if (returnData.data.dupYn === "1") {
                        setInfoEmail("An account already exists with this email address.");
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

    return (
        <>
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
                                <input className="form-control" id="name" type="text" placeholder="Enter your name" value={inputName}
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
                                <input className="form-control" id="password" type="password" placeholder="p" value={inputPassword}
                                    onChange={e => setInputPassword(e.target.value)} onKeyPress={e => keyEnter(e)}
                                />
                                <label htmlFor="password">Password*</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="re-password" type="password" placeholder="p" value={inputRePassword}
                                    onChange={e => setInputRePassword(e.target.value)} onKeyPress={e => keyEnter(e)}
                                />
                                <label htmlFor="password">Confirm Password*</label>
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

export default SignUp;