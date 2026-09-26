import React from 'react';
import { Link, Head, usePage } from '@inertiajs/inertia-react';
import Header from "@/Components/Header";
import Newsletter from "@/Components/Newsletter";
import Footer from "@/Components/Footer";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import GetFreeCourses from '@/Components/GetFreeCourses';
import BlogPosts from '@/Components/Blog/BlogPosts';
import { COURSE_TAGS_COLOR } from '@/Components/Constants';

export default function Welcome() {
    const { mediums, open_courses, open_workshops, home_artworks, blog_posts, testimonials, instructor, openHomeText } = usePage().props;
    const mediumList = [];
    const openCourseList = open_courses.data;
    const openWorkshopList = open_workshops.data;
    console.log(openHomeText);
    mediums.forEach((medium) => {
        mediumList.push(
            <div className="column">
                <Link href={route('courses')} data={{ medium: medium.id }}>
                    <span style={{backgroundImage:`url(storage/uploads/mediums/${medium.id}/${medium.photo})`}}></span>
                    <label>{medium.name}</label>
                </Link>
            </div>
        )
    });
    return (
        <>
            <Head title="Artistik-City" />

            {/* Landing Page start */}
            <Header />
            <div className="homebanner">
                <div className="container">
                    <div className="col50">
                        <h1>Art Learning for <strong>Anyone, Anywhere</strong></h1>
                        <p>Artistikcity is an Art Concept Builder and Provider which help an individual in exploration & growth of their inner artistic.</p>
                        <div className="actn">
                            <GetFreeCourses />
                            {/*<Link href={route('register')} className="btn">Create your free Account <i className="fa fa-angle-right"></i></Link>*/}
                            {/*<Link href={route('courses')} className="btn blue">Browse Courses <i className="fa fa-angle-right"></i></Link>*/}
                        </div>
                    </div>
                </div>
                <img className="banrimg" src="/assets/images/home-banner.png" alt=""/>
            </div>
            <div className="homesection1">
                <div className="container">
                    <div className="homecourse">
                        {mediumList}
                    </div>
                    {/* <div className="homeSocl">
                        <div className="joinfb">
                            <Link href="#">
                                <img src="assets/images/fb1.png" alt="" /><h3>Join
                                    Thriving <strong>Facebook</strong> Community</h3>
                            </Link>
                        </div>

                        <div className="subscribe1">
                            <span className="envicon"><img src="assets/images/env.png" alt=""/></span>
                            <div className="sbform">
                                <h4>Subscribe to recieve FREE sample demo class & PDF</h4>
                                <form>
                                    <input type="email" placeholder="Email Address"/>
                                    <button className="btn">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="section homesection6 bgwhite">
                <div className="container">
                    <div className="insrow">
                        <div className="img"><img src="assets/images/instructor-img.png" alt="" /></div>
                        <div className="txt">
                            <h2>Take the next step toward your personal & professional goals with Artistikcity.</h2>
                            <p>Join now to receive personalized recommendations from the full Artistikcity catalog.</p>
                            <p><a href={route('artistikcity.vision')} className="btn brdr-btn">Read More <i className="fa fa-angle-right"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {openCourseList.length !== 0 && (
                <div className="section homesection3">
                    <div className="container">
                        <h2>Open Courses & Workshops</h2>
                        <div className="courseWrap">
                            <div className="courseslider">
                                <OwlCarousel className='owl-theme' loop={false} margin={10} nav>
                                    {openCourseList.map(({ id, title, slug, sub_title, course_start_date, course_type_id, duration, course_includes, age_group, skill, medium, photos }) => {
                                        return (
                                        <div className='item'>
                                            <div className="box">
                                                {photos.length != 0 && (
                                                    <div className="img"><img src={(`storage/uploads/courses/${id}/${photos[0].photo_name}`)} alt={(`${sub_title}`)} /> 
                                                        {course_type_id == 1 && (<span className="date">Course</span>)}
                                                        {course_type_id == 2 && (<span className="date">Workshop</span>)}
                                                    </div>
                                                )}
                                                <div className="info">
                                                    <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.medium}`}}>{medium.name}</label>
                                                    <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.age}`}}>{age_group}</label>
                                                    <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.skill}`}}>{skill.name}</label>
                                                    <h3><Link href={route('course.details', { slug })}>{title}</Link></h3>
                                                    
                                                    <ul>
                                                        {/* {openHomeText.courseText.map(({id, meta_value}) => {
                                                            return (<li><span className="icon"><img src="assets/images/course-icon-1.svg" alt="" /></span> {meta_value} </li>)
                                                        })} */}
                                                        <li><span className="icon"><img src="assets/images/course-icon-1.svg" alt="" /></span> Starting from {course_start_date} </li>
                                                        {course_type_id == 1 && (<li><span className="icon"><img src="assets/images/course-icon-2.svg" alt="" /></span> ( {duration} weeks course) </li>)}
                                                        {course_type_id == 2 && (<li><span className="icon"><img src="assets/images/course-icon-2.svg" alt="" /></span> ( {duration} days workshop) </li>)}
                                                    </ul>
                                                    <Link href={route('course.details', {slug})} className="btn">Enrol Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* {openWorkshopList.length !== 0 && (
                <div className="section homesection3">
                    <div className="container">
                        <h2>Open Workshops</h2>
                        <div className="courseWrap">
                            <div className="courseslider">
                                <OwlCarousel className='owl-theme' loop={false} margin={10} nav>
                                    {openWorkshopList.map(({ id, title, slug, sub_title, course_start_date, age_group, skill, medium, photos }) => {
                                        return (
                                        <div className='item'>
                                            <div className="box">
                                            {photos.length != 0 && (
                                                <div className="img"><img src={(`storage/uploads/courses/${id}/${photos[0].photo_name}`)} alt={(`${sub_title}`)} /> <span
                                                    className="date">Starting from {course_start_date}</span></div>
                                            )}
                                                <div className="info">
                                                    <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.medium}`}}>{medium.name}</label>
                                                    <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.age}`}}>{age_group}</label>
                                                    <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.skill}`}}>{skill.name}</label>
                                                    <h3><Link href={route('course.details', { slug })}>{title}</Link></h3>
                                                    <ul>
                                                        {openHomeText.workshopText.map(({id, meta_value}) => {
                                                            return (<li><span className="icon"><img src="assets/images/course-icon-1.svg" alt="" /></span> {meta_value} </li>)
                                                        })}
                                                    </ul>
                                                    <Link href={route('course.details', {slug})} className="btn">Enrol Now</Link>
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })}
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            {testimonials.length !== 0 && (
                <div className="section homesection4">
                    <div className="container">
                        <h2>Don't Take Our Word. Hear From Our Students.</h2>
                        <div className="reviewSlider">
                            <OwlCarousel className='owl-theme' loop items={1} margin={10} nav>
                                {testimonials.map(({id, name, slug, title, description, photo}) => {
                                    return (<div className="item">
                                        <div className="img"><img src={(`storage/uploads/testimonials/${id}/${photo}`)} alt="" /></div>
                                        <div className="txt">
                                            <span className="icon"><img src="assets/images/q1.png" alt="" style={{width:`78px`, height:`59px`}} /></span>
                                            <h4>{description}</h4>
                                            <h5>{name}</h5>
                                            <h6>{title}</h6>
                                        </div>
                                    </div>);
                                })}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            )}

            {home_artworks.length !== 0 && (
                <div className="section homesection5">
                    <div className="container">
                        <h2>Over <span className="red">100 Students</span> Have Already Realized
                            Their Inner <span className="blue">Art Potential</span>. </h2>
                        <div className="glryImgs">
                            <ul>
                                {home_artworks.map((item, i) => {
                                    return (
                                        <li>
                                            <a href={(`storage/uploads/home-artworks/${item.id}/${item.photo_name}`)}  data-fancybox="group1"><span style={{ backgroundImage: `url(storage/uploads/home-artworks/${item.id}/${item.photo_name})` }}></span></a>
                                            {/* <span> */}
                                                {/* <ReactFancyBox 
                                                    // defaultThumbnailWidth="277" 
                                                    // defaultThumbnailHeight="277" 
                                                    thumbnail={(`storage/uploads/home-artworks/${item.id}/${item.photo_name}`)} 
                                                    image={(`storage/uploads/home-artworks/${item.id}/${item.photo_name}`)} 
                                                /> */}
                                                {/*<Link href={(`storage/uploads/courses/${item.id}/${item.photo_name}`)} data-fancybox="group1">*/}
                                                {/*    <span style={{backgroundImage:`url(storage/uploads/artworks/${item.id}/${item.photo_name})`}}></span>*/}
                                                {/*</Link>*/}
                                            {/* </span> */}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="btncntr">
                            <a href={route('student.feedback')} className="btn brdr-btn">See Student Work & Feedback <i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            )}


            <div className="section homesection6">
                <div className="container">
                    <h2>About The Instructor</h2>
                    <div className="insrow">
                        <div className="img">
                            <img src={(`/storage/uploads/teachers/${instructor.id}/${instructor.profile_photo}`)} alt={(`${instructor.name}`)} />
                        </div>
                        <div className="txt">
                            <h3>{instructor.name}</h3>
                            <h4>{instructor.profile_title}</h4>
                            <p dangerouslySetInnerHTML={{__html: instructor.profile_description}}></p>
                            <p><a href={route('instructor')} className="btn brdr-btn">Read More <i className="fa fa-angle-right"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="section homesection7">
                <div className="container">
                    <div className="txt">
                        <h2>Instructor<br /> Demonstrations</h2>
                        <p>A collection of content showcasing demo classes with free content.</p>
                        <p><a href="#" className="btn brdr-btn">Get It now <i className="fa fa-angle-right"></i></a></p>
                    </div>
                    <div className="img"><img src="assets/images/image1.png" alt="" /></div>
                </div>
            </div> */}


            <div className="homesection2" style={{background:'#ffffff'}}>
                <div className="container">
                    <h2>Why Choose Artistikcity</h2>

                    <div className="steprow" style={{backgroundImage:'url(assets/images/bgimage1.png)'}}>
                        <div className="stepcol">
                            <span className="icon"><img src="assets/images/step-icon-1.png" alt="" /></span>
                            <h4>Learn at Your Own Pace</h4>
                        </div>
                        <div className="stepcol">
                            <span className="icon"><img src="assets/images/step-icon-2.png" alt="" /></span>
                            <h4>Learn From The Best</h4>
                        </div>
                        <div className="stepcol">
                            <span className="icon"><img src="assets/images/step-icon-3.png" alt="" /></span>
                            <h4>Free Profile</h4>
                        </div>
                        <div className="stepcol">
                            <span className="icon"><img src="assets/images/step-icon-4.png" alt="" /></span>
                            <h4>Creative Community</h4>
                        </div>
                        <div className="stepcol">
                            <span className="icon"><img src="assets/images/step-icon-5.png" alt="" /></span>
                            <h4>Streaming Art Instruction</h4>
                        </div>
                        <div className="stepcol">
                            <span className="icon"><img src="assets/images/step-icon-6.png" alt="" /></span>
                            <h4>Certificate</h4>
                        </div>
                    </div>

                </div>
            </div>

            <BlogPosts blog_posts={blog_posts} />
            <Newsletter />
            <Footer />
            {/*    Landing page ends */}
        </>
    );
}
