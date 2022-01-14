import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

const BaseView = () => {
    window.addEventListener('DOMContentLoaded', event => {

        // Navbar shrink function
        const navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector('#mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink')
            } else {
                navbarCollapsible.classList.add('navbar-shrink')
            }

        };

        // Shrink the navbar 
        navbarShrink();

        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', navbarShrink);

        // Activate Bootstrap scrollspy on the main nav element
        const mainNav = document.body.querySelector('#mainNav');
        if (mainNav) {
            new bootstrap.ScrollSpy(document.body, {
                target: '#mainNav',
                offset: 74,
            });
        };

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
        <div>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="">Mini Crypto</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <li className="nav-item"><a className="nav-link" href="#list">Crypto List</a></li>
                            <li className="nav-item"><a className="nav-link me-lg-3" href="">Sign in</a></li>
                        </ul>
                        <button className="btn btn-primary rounded-pill px-3 mb-02 mb-lg-0" data-bs-toggle="modal" data-bs-target="#startModal">
                            <span className="d-flex align-items-center">
                                <span className="small">Get started</span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
            {/* Intro area */}
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">New portfolio in 2022</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!</p>
                            <a className="btn btn-primary btn-xl" href="#list">VIEW CRYPTO LIST</a>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main List */}
            <section className="page-section bg-primary" id="list">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                            <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                        </div>
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                            <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                        </div>
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                            <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-light py-5" >
                <div className="container px-4 px-lg-5">
                    <div className="small text-center text-muted">Copyright &copy; 2022 - Mini Crypto</div>
                    <div className="small text-center text-muted">(This demo site is for portfolio use only)</div>
                </div>
            </footer >
            {/* Sign up Modal */}
            <div className="modal fade" id="startModal" tabindex="-1" aria-labelledby="startModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-gradient-primary-to-secondary p-4">
                            <h5 className="modal-title font-alt text-white" id="startModalLabel">Create account</h5>
                            <button className="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body border-0 p-4">
                            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                    <label htmlFor="name">Full name*</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                    <label htmlFor="email">Email*</label>
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="password" type="password" placeholder="(123) 456-7890" data-sb-validations="required" />
                                    <label htmlFor="password">Password*</label>
                                    <div className="invalid-feedback" data-sb-feedback="phone:required">A password is required.</div>
                                </div>
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className="text-center mb-3">
                                        <div className="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br />
                                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                                <div className="d-grid"><button className="btn btn-primary rounded-pill btn-lg" id="submitButton" type="submit">Sign up</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script> */}
            {/* <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script> */}
        </div>
    )
}

export default BaseView;