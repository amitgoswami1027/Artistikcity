import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Link} from "@inertiajs/inertia-react";
import axios from "axios";
import {API_URL} from "@/Components/Constants";

export default function Footer(){
    const [latestCourses, setLatestCourses] = useState([]);
    const [latestWorkshop, setLatestWorkshop] = useState([]);
    const url = API_URL;

    useEffect(() => {
        getFooterData();
    }, []);

    const getFooterData = () => {
        axios.get(`${url}/get_footer_data`).then((response) => {
            setLatestCourses(response.data.latestCourses)
            setLatestWorkshop(response.data.latestWorkshop)
        }).catch(error => console.error(`Error: ${error}`));
    };

    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <footer className="footer">
            <div className="ftrSctn">
                <div className="container">
                    <div className="fttTop">
                        <div className="ftrlogo">
                            <Link href="/"><img src="/assets/images/footerlogo.png" alt=""/></Link>
                        </div>
                        <div className="ftrRit">
                            <div className="soclIcn">
                                <Link href="https://www.facebook.com/StudioVaishaliArts/" target="_blank"><img src="/assets/images/facebook.png" alt=""/></Link>
                                <Link href="https://in.linkedin.com/in/vaishali-jetly-goswami-4b5874233" target="_blank"><img src="/assets/images/linkedin.png" alt=""/></Link>
                                <Link href="https://www.youtube.com/@artistikcityYT" target="_blank"><img src="/assets/images/youtube.png" alt=""/></Link>
                                <Link href="https://www.instagram.com/artistikcity/" target="_blank"><img src="/assets/images/instagram.png" alt=""/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="fttBtm">
                        <div className="fcol">
                            <h6>Latest Courses</h6>
                            <ul>
                                {latestCourses.map(({id, title, slug}) => (
                                    <li key={id}><Link href={route('course.details', {slug})}>{title}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="fcol">
                            <h6>Latest Workshop</h6>
                            <ul>
                                {latestWorkshop.map(({id, title, slug}) => (
                                    <li key={id}><Link href={route('course.details', {slug})}>{title}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="fcol">
                            <h6>Courses By Age</h6>
                            <ul>
                                <li><Link href='#'>Sub-junior - 8 to 12 yrs</Link></li>
                                <li><Link href='#'>Junior - 12 to 15 yrs</Link></li>
                                <li><Link href='#'>Adult - 16 yrs and above</Link></li>
                            </ul>
                        </div>
                        <div className="fcol">
                            <h6>Navigation</h6>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href={route('artistikcity.vision')}>Artistikcity Vision</a></li>
                                <li><a href={route('instructor')}>The Instructor Profile</a></li>
                                <li><a href={route('student.feedback')}>Student Work & Feedback</a></li>
                                <li><a href={route('faq')}>Frequently Asked Questions</a></li>
                                <li><a href={route('customer.support')}>Customer Support</a></li>
                                <li><a href={route('contact')}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="copyRight">
                        <p>&copy; Copyright {getCurrentYear()} Artistick City. All rigthts reserved.</p>
                        <p>
                            <a href={route('privacy.policy')}>Privacy Policy</a>
                            <a href={route('terms.conditions')}>Terms & Conditions</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

