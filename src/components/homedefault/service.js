import React from 'react';
import aboutOne from '../../data/images/about/1.jpg';
import aboutTwo from '../../data/images/about/2.jpg';
import aboutThree from '../../data/images/about/3.jpg';
import aboutFour from '../../data/images/about/4.jpg';

const Service = () => {
    return (
        <div className="rn-service-area rn-section-gapBottom">
            <div className="rn-service-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-6 col-image-with-link">
                            <div className="service wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                                <img style={{ maxWidth: "300px", height: "auto" }} src={aboutOne} alt="Griffith Park Observatory, Los Angeles" srl_elementid="0"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 col-image-with-link">
                            <div className="service wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                                <img style={{ maxWidth: "300px", height: "auto" }} src={aboutTwo} alt="Pike Place Market, Seattle" srl_elementid="1"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 col-image-with-link">
                            <div className="service wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                                <img style={{ maxWidth: "300px", height: "auto" }} src={aboutThree} alt="Bay Bridge, San Francisco" srl_elementid="2"/>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 col-image-with-link">
                            <div className="service wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                                <img style={{ maxWidth: "300px", height: "auto" }} src={aboutFour} alt="Downtown, Los Angeles" srl_elementid="3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;