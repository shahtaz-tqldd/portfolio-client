import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast';
import SectionTitle from '../../../components/Typography/SectionTitle'
import SectionHead from '../../../components/Typography/SectionHead'

const ContactMe = () => {
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
    const props = { img: "https://cdn.lordicon.com/diihvcfp.json", text: "Contact Me" }
    return (
        <section id="contact" className='mb-6'>
            <SectionTitle props={props} />
            <SectionHead>
                Let's Work <span className='text-primary'>Together</span>
            </SectionHead>

            {/* FORM */}
            <form ref={form} onSubmit={sendEmail} data-aos="fade-up" >
                <div className='flex lg:flex-row md:flex-row flex-col gap-5 mb-5'>
                    <div className='lg:w-1/2 md:w-1/2'>
                        <label className='text-sm text-white'>Full Name <span className='text-error'>*</span></label><br />
                        <input name="user_name" type="text" placeholder="Your Name" className="input w-full px-0 focus:outline-none" required />
                    </div>
                    <div className='lg:w-1/2 md:w-1/2'>
                        <label className='text-sm text-white'>Email <span className='text-error'>*</span></label><br />
                        <input name="user_email" type="email" placeholder="Your Email" className="input w-full px-0 focus:outline-none" required />
                    </div>
                </div>
                <label className='text-sm text-white'>Message <span className='text-error'>*</span></label>
                <textarea name="message" className="textarea w-full mt-2 p-0 h-64 focus:outline-none" placeholder="Your Message" required></textarea>
                <hr />
                <div className='flex justify-center'>
                    <input type="submit" value="Send" className="btn btn-wide btn-primary rounded-md mt-10 px-6" />
                </div>
            </form>
        </section>
    )
}

export default ContactMe