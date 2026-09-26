import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import Header from "@/Components/Header";
import Breadcrumb from "@/Components/Breadcrumb";
import Footer from "@/Components/Footer";
import Newsletter from "@/Components/Newsletter";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    const breadcrumbs = [
        { path: 'welcome', breadcrumb: 'Home' },
        { path: 'login', breadcrumb: 'Reset Password' },
    ];
    const [crumbs, setCrumbs] = useState(breadcrumbs);
    const selected = crumb => { console.log(crumb); }

    return (
        <Guest>
            <Head title="Reset Password" />
            <Header />
            <Breadcrumb crumbs={crumbs} selected={selected} />
            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
            <section className="loginSc">
                    <div className="container">
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="field"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Confirm Password" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="field"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="btn ml-4" processing={processing}>
                        Reset Password
                    </Button>
                </div>
                </div>
                </section>
            </form>
            <Newsletter />
            <Footer />
        </Guest>
    );
}
