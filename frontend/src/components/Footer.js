import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <React.Fragment>
            <div className="footer">
                <div className="container">
                    <div className="footer-columns">
                        <div className="single-footer-column">
                            <div className="footer-title"><img src="/images/logo.png" alt="logo" /></div>
                            <div className="title-attention"></div>
                            <p>A Job Portal listing different jobs for job seekers and helping companies get good employees.</p>
                        </div>
                        <div className="single-footer-column">
                            <div className="footer-title">Contact Us</div>
                            <div className="title-attention"></div>
                            <p className="mb-20">We are dedicated to delivering the best experience to all our users. If you have any queries, please reach out to us and a member of our team will get back to you as soon as possible.</p>
                            <p><i className="fa fa-envelope" aria-hidden="true"></i> <span>Email:</span> info@jobpedia.com</p>
                            <p><i className="fa fa-clock-o"></i> <span>Mon-Fri:</span> 9:00am - 5:00pm</p>
                        </div>
                        <div className="single-footer-column">
                            <div className="footer-title">Important Links</div>
                            <div className="title-attention"></div>
                            <p><Link to="/privacy">Privacy Policy</Link></p>
                        </div>
                    </div>
                    <div className="footer-border"></div>
                    <p className="copyright">© 2023 <strong>JobPedia</strong>. All rights reserved.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer;