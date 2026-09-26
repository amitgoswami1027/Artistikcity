import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Example from "@/Components/Example";
import SlideToggle from "react-slide-toggle";
import { Link, usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import IsLoggedIn from '@/Components/Students/IsLoggedIn';
import {API_URL} from "@/Components/Constants";

export default function Header() {
    const { auth } = usePage().props;
    let [isOpen, setIsOpen] = useState(false);
    const [mediums, setMediums] = useState([]);
    // const url = 'http://artistik.loc/api';
    // const url = 'http://ec2-54-163-58-246.compute-1.amazonaws.com/api';
    const url = API_URL;

    useEffect(() => {
        getAllMediums();
    }, []);

    const getAllMediums = () => {
        axios.get(`${url}/get_mediums`).then((response) => {
            setMediums(response);
        }).catch(error => console.error(`Error: ${error}`));
    }

    // console.log(mediums.data);
    const mediumList = [];
    // mediums.forEach((medium) => {
    //     mediumList.push(<li><a href="#"><span className="icon"><img src={(`storage/uploads/mediums/${medium.id}/${medium.photo}`)} alt={(`${medium.name}`)} /></span> {medium.name}</a></li>)
    // });
    // console.log(mediums)
    return (
        <header className="header">
            <nav>
                <div className='header-nav-bar'>
                    <div className="container">
                        <div className="hdLeft">
                            <div className="logo"><a href={route('welcome')}><img src="/assets/images/logo.png" alt="Artistik City" /></a></div>
                            <div className="navigation">
                                <ul>
                                    <li><Link href={route('courses')} data={{type: 'course'}} className="ak-btn1"><img src="/assets/images/icons-new/course-icon.png" alt="" width="18" height="27"/>Courses</Link></li>
                                    <li><Link href={route('courses')} data={{type: 'workshop'}} className="ak-btn1"><img src="/assets/images/icons-new/workshop-icon.png" alt="" width="26" height="16"/>Workshop</Link></li>
                                </ul>
                                {/* <ul>
                                    <li className="coursedropdown" onClick={() => setIsOpen(s => !s)}><a href="#">Courses & Workshop</a></li>
                                </ul> */}
                            </div>
                        </div>
                        <div className="hdRit">
                            <div className="menuRit">
                                <ul>
                                    {/* <li className="menu-item-has-children"><a href={route('courses')}>Explore ArtistikCity</a></li> */}
                                    <li className="menu-item-has-children"><a href="#" onClick={() => setIsOpen(s => !s)}>Explore ArtistikCity</a></li>
                                </ul>
                            </div>
                            <IsLoggedIn auth={auth} />
                        </div>
                    </div>

                    {isOpen && (
                        <SlideToggle
                            // duration={1000}
                            // collapsed={true}
                            // whenReversedUseBackwardEase={false}
                            duration={500}
                            collapsed
                            whenReversedUseBackwardEase
                            onMount={({ toggle }) => toggle()}
                            render={({ toggle, setCollapsibleElement }) => (
                                <div ref={setCollapsibleElement}>
                                    <div className="menudropdown" style={{position: `absolute`}}>
                                        <div className="container">
                                            <div className="byMedium">
                                                <h6>Browse Courses by Medium</h6>
                                                <ul>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-1.jpg" alt="" /></span> Graphite</a></li>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-2.jpg" alt="" /></span> Charcol Courses</a></li>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-3.jpg" alt="" /></span> Pastal Courses</a></li>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-4.jpg" alt="" /></span> Watercolor Courses</a></li>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-5.jpg" alt="" /></span> Colourpencil Courses</a></li>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-6.jpg" alt="" /></span> Acrylic Courses</a></li>
                                                    <li><a href="#"><span className="icon"><img src="/assets/images/menu-icon-7.jpg" alt="" /></span> Other Courses</a></li>
                                                </ul>
                                            </div>

                                            <div className="handPicked">
                                                <h6>Handpicked Courses</h6>
                                                <ul>
                                                    <li><a href="#">Introduction to drawing</a></li>
                                                    <li><a href="#">Sketching Masterclass</a></li>
                                                    <li><a href="#">Watercolor Drawing</a></li>
                                                    <li><a href="#">Basics of Painting</a></li>
                                                    <li><a href="#">Introduction to drawing</a></li>
                                                </ul>
                                                <ul>
                                                    <li><a href="#">Introduction to drawing</a></li>
                                                    <li><a href="#">Sketching Masterclass</a></li>
                                                    <li><a href="#">Watercolor Drawing</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    )}
                </div>
            </nav>
        </header>
    );
}
