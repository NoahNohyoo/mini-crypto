import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
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

    return (
        <a className="nav-link me-lg-3" onClick={goSignOut} >Sign Out</a>
    )

}

export default SignOut;