import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import { } from "jquery.cookie";
axios.defaults.withCredentials = false;
const headers = { withCredentials: true };

const myAssets = () => {


    return (
        <>
            {/* My Assets */}
            <section className="page-section bg-primary">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="text-white mt-0">My Assets in Mini Crypto</h2>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default myAssets;