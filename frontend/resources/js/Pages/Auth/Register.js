import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Checkbox from '@/Components/Checkbox';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import Header from "@/Components/Header";
import Breadcrumb from "@/Components/Breadcrumb";
import Newsletter from "@/Components/Newsletter";
import Footer from "@/Components/Footer";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        newsletter_signup: 1
    });
    const { flash } = usePage().props

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            preserveScroll: (page) => Object.keys(page.props.errors).length,
        });
    };

    const breadcrumbs = [
        { path: 'welcome', breadcrumb: 'Home' },
        { path: 'register', breadcrumb: 'Register'},
    ];
    const [crumbs, setCrumbs] = useState(breadcrumbs);
    const selected = crumb => { console.log(crumb); }

    return (
        <Guest>
            <Head title="Register" />
            <Header />
            <Breadcrumb crumbs={crumbs} selected={selected} />
            
            <form onSubmit={submit}>
                <section className="loginSc">
                    <div className="container">
                        <div className="colLft"><img src="assets/images/register-banner.jpg" alt=""/></div>
                        <div className="colRit">
                            <ValidationErrors errors={errors} />
                            <div>
                                {flash.message && (
                                    <div className="alert">{flash.message}</div>
                                )}
                            </div>
                            <h4>Register And Start Learning</h4>
                            <div className="formSc">
                                <ul>
                                    <li>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="field"
                                            autoComplete="name"
                                            placeholder="Full Name"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </li>
                                    <li>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="field"
                                            autoComplete="username"
                                            placeholder="Email Address"
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </li>
                                    <li>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="field"
                                            autoComplete="new-password"
                                            placeholder="Password"
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </li>
                                    <li>
                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="field"
                                            placeholder="Confirm Password"
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </li>
                                    <li>
                                        <label>
                                            <Checkbox 
                                                type="checkbox" 
                                                className="field" 
                                                name="newsletter_signup" 
                                                handleChange={onHandleChange} 
                                                value="1"
                                            />
                                            <span>I'm in for emails with personalized<br />recommendations and latest update</span>
                                        </label>
                                    </li>
                                    <li>
                                        <Button className="btn" processing={processing}>
                                            Register
                                        </Button>
                                    </li>
                                    <li className="full">
                                        <p className="or">or</p>
                                    </li>
                                    <li>
                                        <i><img src="/assets/images/fb-icon.png" alt="Facebook Login"/></i>
                                        <a href={'/social-login/facebook'} className="lgnBtn fbBtnk">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Continue with facebook</a>
                                    </li>
                                    <li>
                                        <i><img src="/assets/images/google-icon.png" alt="Google Login"/></i>
                                        <a href={'/social-login/google'} className="lgnBtn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Continue with Google&nbsp;&nbsp;&nbsp;</a>
                                    </li>
                                    <li>
                                        <h6>Already have an account?&nbsp;<Link href={route('login')}>Login</Link></h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>


                {/*<div>*/}
                {/*    <Label forInput="name" value="Name" />*/}

                {/*    <Input*/}
                {/*        type="text"*/}
                {/*        name="name"*/}
                {/*        value={data.name}*/}
                {/*        className="mt-1 block w-full"*/}
                {/*        autoComplete="name"*/}
                {/*        isFocused={true}*/}
                {/*        handleChange={onHandleChange}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="mt-4">*/}
                {/*    <Label forInput="email" value="Email" />*/}

                {/*    <Input*/}
                {/*        type="email"*/}
                {/*        name="email"*/}
                {/*        value={data.email}*/}
                {/*        className="mt-1 block w-full"*/}
                {/*        autoComplete="username"*/}
                {/*        handleChange={onHandleChange}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="mt-4">*/}
                {/*    <Label forInput="password" value="Password" />*/}

                {/*    <Input*/}
                {/*        type="password"*/}
                {/*        name="password"*/}
                {/*        value={data.password}*/}
                {/*        className="mt-1 block w-full"*/}
                {/*        autoComplete="new-password"*/}
                {/*        handleChange={onHandleChange}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="mt-4">*/}
                {/*    <Label forInput="password_confirmation" value="Confirm Password" />*/}

                {/*    <Input*/}
                {/*        type="password"*/}
                {/*        name="password_confirmation"*/}
                {/*        value={data.password_confirmation}*/}
                {/*        className="mt-1 block w-full"*/}
                {/*        handleChange={onHandleChange}*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="flex items-center justify-end mt-4">*/}
                {/*    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">*/}
                {/*        Already registered?*/}
                {/*    </Link>*/}

                {/*    <Button className="ml-4" processing={processing}>*/}
                {/*        Register*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </form>
            <Newsletter />
            <Footer />
        </Guest>
    );
}
