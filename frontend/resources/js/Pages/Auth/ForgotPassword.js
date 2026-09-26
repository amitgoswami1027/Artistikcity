import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
import Header from "@/Components/Header";
import Breadcrumb from "@/Components/Breadcrumb";
import Footer from "@/Components/Footer";
import Newsletter from "@/Components/Newsletter";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    const { flash } = usePage().props

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };
    const breadcrumbs = [
        { path: 'welcome', breadcrumb: 'Home' },
        { path: 'login', breadcrumb: 'Forgot Password' },
    ];
    const [crumbs, setCrumbs] = useState(breadcrumbs);
    const selected = crumb => { console.log(crumb); }
    return (
        <Guest>
            <Head title="Forgot Password" />
            <Header />
            <Breadcrumb crumbs={crumbs} selected={selected} />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <section className="loginSc">
                    <div className="container">
                        <div className="colLft"> <img src="assets/images/login-banner.jpg" alt="" /> </div>
                        <div className="colRit">
                            <div>
                                {flash.message && (
                                    <div className="alert">{flash.message}</div>
                                )}
                            </div>
                            <div className="mb-4 text-sm text-gray-500 leading-normal">
                                Forgot your password? No problem. Just let us know your email address and we will email you a password
                                reset link that will allow you to choose a new one.
                            </div>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}


                            <div className="formSc">
                                <ul>
                                    <li>

                                        <Input
                                            type="text"
                                            name="email"
                                            value={data.email}
                                            className="field"
                                            isFocused={true}
                                            handleChange={onHandleChange}
                                        />
                                    </li>
                                    <li>
                                        <div className="flex items-center justify-end mt-4">
                                            <Button className="btn ml-4" processing={processing}>
                                                Email Password Reset Link
                                            </Button>
                                        </div>
                                    </li>
                                    <li>
                                        <h6>Already have an account?&nbsp;<Link href={route('login')}>Login</Link></h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </form>

            <Newsletter />
            <Footer />
        </Guest>
    );
}
