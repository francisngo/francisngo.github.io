import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { socialMedia } from '../../config';

const Footer = ({ showBelow }) => {
    const [ show, setShow ] = useState(showBelow ? false : true);

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll);
            return () => window.removeEventListener(`scroll`, handleScroll);
        }
    });

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        } else {
            if (show) setShow(false);
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` });
    }
    
    console.log('socialMedia:' ,socialMedia)

    return (
        <footer className="rn-footer-area bg-color-black pt--90 pb--60">
            <div className="footer-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.1s">
                            <div className="ft-info">
                                <p>Designed &amp; Built by Francis Ngo</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.4s">
                            <div className="ft-info">
                                <p>francis.t.ngo@gmail.com<br />(510) 332-8722</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt_md--30 mt_sm--30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.6s">
                            <div className="ft-info">
                                <ul className="social-share">
                                    {socialMedia && 
                                        socialMedia
                                            .filter(social => social.name !== 'Github')
                                            .map(({ name, url }, i) => (
                                                <li key={i}>
                                                    <a href={url}>
                                                        {
                                                            name === 'YouTube' ? (
                                                                <FaYoutube />
                                                            ) : name === 'Instagram' ? (
                                                                <FaInstagram />
                                                            ) : name === 'Linkedin' ? (
                                                                <FaLinkedinIn />
                                                            ) : null
                                                        }
                                                    </a>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="back-to-top">
                <div tabindex="0" role="button" className="backtop" onClick={handleClick} onKeyDown={handleClick}>
                    <span className="top"></span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;