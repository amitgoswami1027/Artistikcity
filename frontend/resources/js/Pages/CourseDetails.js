import Breadcrumb from '@/Components/Breadcrumb';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import Tabs from '@/Components/Tabs';
import {COURSE_TAGS_COLOR} from '@/Components/Constants';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";

export default function Courses() {
    const { course } = usePage().props;
    const { data } = course;
    const token = document.head.querySelector('meta[name="csrf-token"]');
    const [values, setValues] = useState({
        course_id: data.id,
    })
    const [pageURL, setPageURL] = useState(0);
    useEffect(() => {
        setPageURL(window.location.href);
    })
    let course_title = data.title;
    const breadcrumbs = [
        { path: 'welcome', breadcrumb: 'Home' },
        { path: 'courses', breadcrumb: 'Courses'},
        { path: 'course.details', breadcrumb: course_title},
    ];
    const [crumbs, setCrumbs] = useState(breadcrumbs);
    const selected = crumb => {
        console.log(crumb);
    }
    // console.log(token.content);
    const onHandleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    
    const introduction = (
        <div className="introtext">
            <h2>Introduction</h2>
            <p>{data.introduction}</p>
            <hr />
            <div dangerouslySetInnerHTML={{__html: data.introduction_details}}></div>
        </div>
    );

    const courseSummary = (
        <div className="introtext">
            <h2>Course Summary</h2>
            <p>{data.summary}</p>
            <hr />
            <div dangerouslySetInnerHTML={{__html: data.summary_details}}></div>
        </div>
    );

    const courseSchedule = (
        <div className="introtext intorschedule">
            <h2>Course Schedule</h2>
            <p>{data.schedule}</p>
            <hr />
            <div dangerouslySetInnerHTML={{__html: data.schedule_details}}></div>
        </div>
    );

    const tabsData = [
        {
            id: 1,
            tabTitle: 'Introduction',
            title: '',
            content: introduction
        },
        {
            id: 2,
            tabTitle: 'Course Summary',
            title: '',
            content: courseSummary
        },
        {
            id: 3,
            tabTitle: 'Course Schedule',
            title: '',
            content: courseSchedule
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('course.add.cart.post'), values);
        // post(route('course.checkout', values));
    }
    return (
        <>
            <Header />
            <Breadcrumb crumbs={ crumbs } selected={ selected }  />
            <div className="course_detail">
                <div className="container">
                    <div className="courseleft">
                        <div className="course-head">
                            <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.medium}`}}>{data.medium.name}</label>
                            <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.age}`}}>{data.age_group}</label>
                            <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.skill}`}}>{data.skill.name}</label>
                            <h1>{data.title}</h1>
                            
                            <h6>Instructor: <a href={route('teacher.profile', data.teacher.slug)}>{data.teacher.name} </a></h6>
                            <p>{data.sub_title}</p>
                            <div className="couserating">
                                {/* <span className="ratingStar"><label>4.6</label> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star-half"></i></span> */}
                                {/* <a href="#"><i className="fa fa-heart-o"></i> Wishlist</a> &nbsp; */}
                                <FacebookShareButton title={data.title} url={pageURL} hashtags={["hashtag1", "hashtag2"]}>
                                    <FacebookIcon size={32} round /> 
                                </FacebookShareButton>&nbsp;
                                <TwitterShareButton title={data.title} url={pageURL} hashtags={["hashtag1", "hashtag2"]}>
                                    <TwitterIcon size={32} round /> 
                                </TwitterShareButton>&nbsp;
                                <LinkedinShareButton title={data.title} url={pageURL} hashtags={["hashtag1", "hashtag2"]}>
                                    <LinkedinIcon size={32} round /> 
                                </LinkedinShareButton>&nbsp;
                                <WhatsappShareButton title={data.title} url={pageURL} hashtags={["hashtag1", "hashtag2"]}>
                                    <WhatsappIcon size={32} round /> 
                                </WhatsappShareButton>
                                {/* <div class="sharethis-inline-share-buttons"></div> */}
                            </div>
                            <div className="dtlimage">
                            {data.photos.length != 0 && (
                                <img src={(`/storage/uploads/courses/${data.id}/${data.photos[0].photo_name}`)} alt={(`${data.title}`)} />
                            )}
                            </div>
                        </div>
                        <Tabs tabsData={tabsData} />
                    </div>

                    <div className="courseright">
                        <div className="widget buyCourse">
                            <form method={'post'} action='/add-to-cart'>
                                <input type="hidden" name="course_id" id="course_id" value={data.id} onChange={onHandleChange} />
                                <input type="hidden" name="_token" id="csrf-token" value={token.content} />
                                <input type="hidden" name="price_type" value="inr" />
                                <input type="hidden" name="price" value={data.prices[0].price_inr} />
                                <h3>Buy Course</h3>
                                <div className="pd30">
                                    <p>{data.duration} weeks / {data.time_required} hours a week</p>
                                    <h2>{data.prices[0].price_inr.toLocaleString("en-US", {style:"currency", currency:"INR"})}</h2>
                                    <ul>
                                        <li>Starting On: {data.course_start_date}</li>
                                    </ul>
                                    <Button type="submit" className="btn" style={{display: 'block', width: '100%'}}>Buy Now</Button>
                                </div>
                            </form>
                            {/*<form onSubmit={handleSubmit}>*/}
                            {/*    <input  type="hidden" name="course_id" id="course_id" value={data.id} onChange={onHandleChange} />*/}
                            {/*    <h3>Buy Course</h3>*/}
                            {/*    <div className="pd30">*/}
                            {/*        <p>4 weeks / 10 hrs a week</p>*/}
                            {/*        <h2>₹490.00</h2>*/}
                            {/*        <Button type="submit" className="btn">Buy Now</Button>*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                        </div>

                        <div className="widget courseInc">
                            <h3>Course Includes</h3>
                            <div className="pd30">
                                <ul>
                                    {data.duration != "" && (<li><span className="icon"><img src="/assets/images/icon-1.png" alt="" /></span> Course Duration: {data.duration}</li>)}
                                    {data.sessions != "" && (<li><span className="icon"><img src="/assets/images/icon-2.png" alt="" /></span> Sessions: {data.sessions}</li>)}
                                    {data.time_required != "" && (<li><span className="icon"><img src="/assets/images/icon-4.png" alt="" /></span> Time Required: {data.time_required} Hours/session</li>)}
                                    {data.medium.length !== 0 && (<li><span className="icon"><img src="/assets/images/icon-2.png" alt="" /></span> Medium: {data.medium.name}</li>)}
                                    {data.skill.length !== 0 && (<li><span className="icon"><img src="/assets/images/icon-2.png" alt="" /></span> Skill: {data.skill.name}</li>)}
                                    {data.age_group != "" && (<li><span className="icon"><img src="/assets/images/icon-4.png" alt="" /></span> Age: {data.age_group}</li>)}
                                    {data.mini_projects != "" && (<li><span className="icon"><img src="/assets/images/icon-3.png" alt="" /></span> Project count: {data.mini_projects}</li>)}
                                    {data.course_modules != "" && (<li><span className="icon"><img src="/assets/images/icon-5.png" alt="" /></span> Module count: {data.course_modules}</li>)}
                                    {data.course_includes.length > 0 && (
                                        data.course_includes.certificate == 'yes' && (<li><span className="icon"><img src="/assets/images/icon-9.png" alt="" /></span> Certificate: Yes</li>)
                                    )}
                                    {data.course_includes.study_material_access == 'yes' && (<li><span className="icon"><img src="/assets/images/icon-7.png" alt="" /></span> Study Material access: Yes</li>)}
                                    
                                    {/* <li><span className="icon"><img src="/assets/images/icon-2.png" alt="" /></span> Online</li>
                                    <li><span className="icon"><img src="/assets/images/icon-3.png" alt="" /></span> 4-5 Mini Projects</li>
                                    <li><span className="icon"><img src="/assets/images/icon-5.png" alt="" /></span> 3 Course modules</li>
                                    <li><span className="icon"><img src="/assets/images/icon-6.png" alt="" /></span> 24 hours support from tutor</li>
                                    <li><span className="icon"><img src="/assets/images/icon-7.png" alt="" /></span> Downloadable study material</li>
                                    <li><span className="icon"><img src="/assets/images/icon-8.png" alt="" /></span> Live Session</li>
                                    <li><span className="icon"><img src="/assets/images/icon-9.png" alt="" /></span> Certificate Award</li> */}
                                </ul>
                            </div>
                        </div>

                        {data.teacher.length !== 0 && (<div className="widget">
                            <h3>Instructor</h3>
                            <div className="pd30 courseInstructor">
                            <img src={(`/storage/uploads/teachers/${data.teacher.id}/${data.teacher.profile_photo}`)} alt={(`${data.teacher.name}`)} />
                                <h5>Instructor:</h5>
                                <h4><a href={route('teacher.profile', data.teacher.slug)}>{data.teacher.name}</a></h4>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
