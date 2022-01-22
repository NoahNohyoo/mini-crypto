import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
import * as config from "../config";
const headers = { withCredentials: true };

const SignOut = (props) => {
    const history = useHistory();
    const handleToMain = () => {
        history.push("/");
    }
    const toggle = () => {
        props.toggle();
    }

    const goSignOut = async () => {
        axios
            .get(`${config.SERVER_URL}/miniUser/logout`, {
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

    return (
        <a className="nav-link me-lg-3" onClick={goSignOut} >Sign Out</a>
    )

}

export default SignOut;