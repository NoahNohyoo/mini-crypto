import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const Trade = () => {


    return (
        <>
            {/* Trade */}
            <section className="page-section bg-primary">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="text-white mt-0">Trade in Mini Crypto</h2>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Trade;