import React from 'react';
import ReactDOM from "react-dom";
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
import swal from 'sweetalert';

function Newsletter(){
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        // post(route('newsletter.save'));
        axios.post(route('newsletter.save'), {
            email: data.email
        })
        .then(function (response) {
            console.log(response.data.message);
            if(response.data.message == "success"){
                swal('You email id is added for newsletter subscription!');
            }else{
                swal('Something went wrong, please try again!');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    return (
        <section className="section newsLtr" style={{backgroundImage: 'url(/assets/images/newsletter-Bg.jpg)'}}>
            <div className="container">
                <h2>Sign Up Our Newsletter</h2>
                <p>Subscribe our newsletter to receive the latest news and exclusive offers every week.</p>
                <div className="sgForm">
                    <form onSubmit={submit}>
                        <Input type="email" name="email" value={data.email} handleChange={onHandleChange} placeholder="Email Address" />
                        <Button className="btn" processing={processing}>Subscribe</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;

if (document.getElementById('newsletter')) {
    ReactDOM.render(<Newsletter />, document.getElementById('newsletter'));
}
