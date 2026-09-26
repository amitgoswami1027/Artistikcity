import Breadcrumb from '@/Components/Breadcrumb';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Input from '@/Components/Input';
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import {COURSE_TAGS_COLOR} from "@/Components/Constants";

export default function Courses() {
    const { courses, categories, course_types, genres, mediums, skills, type } = usePage().props;
    const categoryList = [];
    const courseTypeList = [];
    const genreList = [];
    const mediumList = [];
    const skillList = [];
    const { data } = courses, [query, setQuery] = useState("");

    const [name, setName] = useState('');
    const [foundData, setFoundData] = useState(data);
    const [courseMedium, setCourseMedium] = useState('All');
    
    const breadcrumbs = [
        { path: 'welcome', breadcrumb: 'Home' },
        { path: 'courses', breadcrumb: 'Courses'},
    ];
    const [crumbs, setCrumbs] = useState(breadcrumbs);
    const selected = crumb => { console.log(crumb); }

    const [values, setValues] = useState({
        ageGroup: {
            subjunior: false,
            junior: false,
            adult: false
        }
    })
    
    const chkClick = (e) => {
        const key = e.target.id;
        const value = e.target.value
        const isChecked = e.target.checked;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
        console.log(values);
    }

    const clickEvent = (e) => {
        e.preserveState;
        let id = e.target.id;
        let dataType = e.target.getAttribute('data-name');
        let dataVal = e.target.getAttribute('data-val');

        if(dataType == 'medium'){
            setCourseMedium(dataVal);
        }else{
            setCourseMedium('All');
        } 
        if (id !== '') {
            const results = data.filter((course) => {
                if(dataType == 'medium'){
                    return course.medium_id == id;
                }
                if(dataType == 'genre'){
                    return course.genre_id.includes(id);
                }
                if(dataType == 'age'){
                    return course.age_group.includes(dataVal);
                }
            });
            setFoundData(results);
        } else {
            setFoundData(data); // If the text field is empty, show all data
        }
        
        // Inertia.visit('/courses?medium='+id+'', {
        //     method: 'get',
        //     data: {},
        //     replace: false,
        //     preserveState: false,
        //     preserveScroll: false,
        //     // only: ['foundData'],
        //     // headers: {},
        //     // errorBag: null,
        //     // forceFormData: false,
        //     // onCancelToken: cancelToken => {},
        //     // onCancel: () => {},
        //     // onBefore: visit => {},
        //     // onStart: visit => {},
        //     // onProgress: progress => {},
        //     // onSuccess: page => {},
        //     // onError: errors => {},
        //     // onFinish: visit => {},
        //   })
    }

    categories.forEach((category) => {
        categoryList.push(<li><Link href={route('courses')} data={{ category: category.id }}>{category.name}</Link></li>)
    });

    course_types.forEach((course_type) => {
        courseTypeList.push(<li><Link href={route('courses')} data={{ type: course_type.course_type_slug }}>{course_type.name}</Link></li>)
    });

    genres.forEach((genre) => {
        // genreList.push(<li><Link href={route('courses')} data={{ genre: genre.id }}>{genre.name}</Link></li>)
        genreList.push(<li><a onClick={clickEvent} id={genre.id} data-name={`genre`} data-val={genre.name}>{genre.name}</a></li>)
    });

    mediums.forEach((medium) => {
        // mediumList.push(<li><Link href={route('courses')} data={{ medium: medium.id }}>{medium.name}</Link></li>)
        mediumList.push(<li><a onClick={clickEvent} id={medium.id} data-name={`medium`} data-val={medium.name}>{medium.name}</a></li>)
    });

    skills.forEach((skill) => {
        skillList.push(<li><Link href={route('courses')} data={{ skill: skill.id }}>{skill.name}</Link></li>)
    });

    const filter = (e) => {
        const keyword = e.target.value; 
        if (keyword !== '') {
          const results = data.filter((course) => {
            // return course.title.toLowerCase().startsWith(keyword.toLowerCase()); // Use the toLowerCase() method to make it case-insensitive
            return course.title.toLowerCase().includes(keyword.toLowerCase());
        });
            setFoundData(results);
        } else {
            setFoundData(data); // If the text field is empty, show all data
        }
        setName(keyword);
      };
    return (
        <>
            <Header />
            <Breadcrumb crumbs={ crumbs } selected={ selected }  />

            <section className="listngSc">
                <div className="container">
                    <div className="sidebarLft">
                        {/* <div className='sideBlock'>
                            <h6>Search</h6>
                            <input type="search" value={name} onChange={filter} className="input" placeholder="Filter" />
                        </div> */}
                        <div className="sideBlock">
                            <h6>Medium</h6>
                            <ul className="navList">
                                {mediumList}
                            </ul>
                        </div>
                        <div className="sideBlock">
                            <h6>Genres</h6>
                            <ul className="navList">
                                {genreList}
                            </ul>
                        </div>
                        {/* <div className="sideBlock">
                            <h6>Course Type</h6>
                            <ul className="navList">
                                {courseTypeList}
                            </ul>
                        </div> */}
                        <div className="sideBlock">
                            <h6>Skill</h6>
                            <ul className="navList">
                                {skillList}
                            </ul>
                        </div>
                        <div className="sideBlock">
                            <h6>Age</h6>
                            <ul className="navList">
                                <li><a onClick={clickEvent} id={`subjunior`} data-name={`age`} data-val={`Sub-junior - 8 to 12 yrs`}>Sub-junior - 8 to 12 yrs</a></li>
                                <li><a onClick={clickEvent} id={`junior`} data-name={`age`} data-val={`Junior - 12 to 15 yrs`}>Junior - 12 to 15 yrs</a></li>
                                <li><a onClick={clickEvent} id={`adult`} data-name={`age`} data-val={`Adult - 16 yrs and above`}>Adult - 16 yrs and above</a></li>
                                {/* <li><input type="checkbox" id="c1" name="subjunior" value={`subjunior`} onChange={chkClick} /> <label for="c1"> </label></li>
                                <li><input type="checkbox" id="c2" name="junior" value={`junior`} onChange={chkClick} /> <label for="c2">Junior - 12 to 15 yrs</label></li>
                                <li><input type="checkbox" id="c3" name="adult" value={`adult`} onChange={chkClick} /> <label for="c3">Adult - 16 yrs and above</label></li> */}
                            </ul>
                        </div>
                        {/* <div className="sideBlock">
                            <h6>Course Category</h6>
                            <ul className="navList">
                                {categoryList}
                            </ul>
                        </div> */}
                    </div>


                    <div className="sidebarRit">
                        <div className="progrmHd">
                            <div className="leftcol">
                                <h3>{courseMedium} {type}</h3>
                                <p></p>
                                
                            </div>
                            <div className="sortby">
                                <select>
                                    <option value="Popular">Popularity</option>
                                    <option value="Price">Price: low to high</option>
                                </select>
                            </div>
                        </div>

                        <div className="courselist">
                            {foundData.map(({ id, title, slug, sub_title, introduction, age_group, course_type, skill, medium, teacher, prices, photos, duration, time_required, course_start_date }) => {
                                return (
                                    <div className="courserow">
                                        <div className="coursethumb">
                                        {photos.length != 0 && (
                                            <img src={(`storage/uploads/courses/${id}/${photos[0].photo_name}`)} alt={(`${sub_title}`)} />
                                        )}
                                        </div>
                                        <div className="courseContent">
                                            <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.medium}`}}>{medium.name}</label>
                                            <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.age}`}}>{age_group}</label>
                                            <label className="categorybtn" style={{background: `${COURSE_TAGS_COLOR.skill}`}}>{skill.name}</label>
                                            <h3><Link href={route('course.details', { slug })}>{title}</Link></h3>
                                            <ul>
                                                <li>Starting On: {course_start_date}</li>
                                                {/* <li><i><img src="assets/images/live-icon.png" alt="" /></i> {course_type.name}</li> */}
                                                {/* <li><i><img src="assets/images/user-icon.png" alt="" /></i> {age_group}</li> */}
                                                {/* <li><i><img src="assets/images/intermediate-icon.png" alt="" /></i> {skill.name}</li> */}
                                            </ul>
                                            <h5>Instructor: <Link href={route('teacher.profile', teacher.slug)}>{teacher.name}</Link></h5>
                                            <p>{introduction}</p>
                                            <div className="courseprice">
                                                <span className="date"><img src=" assets/images/date-icon.png" alt="" /> {duration} / {time_required}</span>
                                                <span className="price">₹{prices[0].price_inr}</span>
                                                <Link className="btn" href={route('course.details', { slug })}>Buy Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {foundData.length === 0 && (
                                <div className="py-12">
                                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                            <div className="p-6 bg-white border-b border-gray-200">No Data Found! </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                        {/* <div className="loadmore"><a href="#" className="btn">Load More <i className="fa fa-angle-down" aria-hidden="true"></i></a></div> */}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
