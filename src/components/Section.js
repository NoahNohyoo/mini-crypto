import React from 'react';
import SectionData from "./SectionData";

const Section = () => {
    return (
        <>
            {/* Main List */}
            <section className="page-section bg-primary" id="list">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">Create your cryptocurrency portfolio today</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Mini Crypto has a variety of features that make it the best place to start trading</p>
                            <ul className="list-group-horizontal">
                                <li className="cList">
                                    <span className="item-no">#</span>
                                    <span className="item-name">Name</span>
                                    <span className="item-price">Price</span>
                                    <span className="item-trade">Trade</span>
                                </li>
                                <SectionData />
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Section;