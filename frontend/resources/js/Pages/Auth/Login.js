import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Header from "@/Components/Header";
import Breadcrumb from "@/Components/Breadcrumb";
import Footer from "@/Components/Footer";
import Newsletter from "@/Components/Newsletter";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const breadcrumbs = [
        { path: 'welcome', breadcrumb: 'Home' },
        { path: 'login', breadcrumb: 'Login'},
    ];
    const [crumbs, setCrumbs] = useState(breadcrumbs);
    const selected = crumb => { console.log(crumb); }

    return (
        <Guest>
            <Head title="Log in" />
            <Header />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <Breadcrumb crumbs={crumbs} selected={selected} />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
            <section className="loginSc">
                <div className="container">
                    <div className="colLft"> <img src="assets/images/login-banner.jpg" alt="" /> </div>
                    <div className="colRit">
                        <h4>Login to Your Artistick City Account </h4>
                        <div className="formSc">
                            <ul>
                                <li>
                                <Input
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="field"
                                    autoComplete="username"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />
                                </li>
                                <li>
                                <Input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="field"
                                    autoComplete="current-password"
                                    handleChange={onHandleChange}
                                />
                                </li>
                                <li className="full">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="underline text-sm text-gray-600 hover:text-gray-900"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    <Button className="btn" processing={processing}>Log in</Button>
                                </li>
                                <li className="full">
                                    <p className="or">or</p>
                                </li>
                                <li>
                                    <i><img src="/assets/images/fb-icon.png" alt="Facebook Login"/></i>
                                    <a href={'/social-login/facebook'} className="lgnBtn fbBtnk">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Continue with facebook</a>
                                    {/*<Input type="submit" className="lgnBtn fbBtn" value="Continue with facebook" />*/}
                                </li>
                                <li>
                                    <i><img src="/assets/images/google-icon.png" alt="Google Login"/></i>
                                    <a href={'/social-login/google'} className="lgnBtn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Continue with Google&nbsp;&nbsp;&nbsp;</a>
                                    {/*<Input type="submit" className="lgnBtn" value="Continue with Google" />*/}
                                </li>
                                {/* <li>
                                    <i><img src="/assets/images/apple-icon.png" alt=""/></i>
                                    <Link href={'login/apple'} className="lgnBtn">Continue with Apple</Link>
                                </li> */}
                                <li>
                                    <h6>Don't have an Account? <Link href={route('register')}>Register</Link></h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
                {/* <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" processing={processing}>
                        Log in
                    </Button>
                </div> */}
            </form>
            <Newsletter />
            <Footer />
        </Guest>
    );
}
