import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast';

const ContactMeForm = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('portfolio_667', 'template_apysugl', form.current, 'FrkGzLxcaakBMtJKf')
            .then((result) => {
                console.log(result.text);
                e.target.reset()
                toast.success("Message sent successfully")
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div data-aos="fade-up" className='bg-neutral rounded-lg p-6'>
            <h2 className='mb-6 text-xl text-white'>Send me your Message or Queries</h2>
            
            <form ref={form} onSubmit={sendEmail}>
                <input name="user_name" type="text" placeholder="Your Name" className="input input-bordered w-full my-2 focus:outline-none focus:border-primary" />

                <input name="user_email" type="email" placeholder="Your Email" className="input input-bordered w-full my-2 focus:outline-none focus:border-primary" />

                <textarea name="message" className="textarea textarea-bordered w-full mt-5 h-64 focus:outline-none focus:border-primary" placeholder="Your Message"></textarea>

                <input type="submit" value="Send" className="btn btn-success rounded-md mt-5 mb-3 px-8" />
            </form>
        </div>
    )
}

export default ContactMeForm