import React from "react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const Contact = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  // Shows alert message for form submission feedback
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY,
      );

      // Display success alert
      toggleAlert('Form submission was successful!', 'success');
    } catch (e) {
      console.error(e);
      // Display error alert
      toggleAlert('Uh oh. Something went wrong.', 'danger');
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      reset();
    }
  };


  return (
    <>
      {/* mb-8 daala tha section mein*/}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center py-16 px-4 md:px-12 max-w-6xl mx-auto"
      >
        <h1 className="text-center mb-16 text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-wide">
          CONTACT
        </h1>
        {/* CONTENT */}
        <div className=" flex justify-between items-center flex-col md:flex-row gap-10">
          {/* LEFT SIDE */}
          <div className="left-side w-full md:w-1/2 px-4 text-center md:text-left text-white space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Let's work together
            </h1>
            <p className="text-gray-400 mb-4">
              I am available for full-time roles & freelance projects.
            </p>
            <p className="text-gray-400 mb-4">
              My inbox is always open, whether you have a question or just want
              to say Hi.
            </p>
            <p className="text-gray-400 mb-6">
              I will try my best to get back to you.
            </p>
            <a
              href="mailto:ameerhamza450505@gmail.com"
              className="inline-flex items-center gap-2 
bg-gradient-to-r from-purple-700 to-indigo-700 
hover:from-purple-800 hover:to-indigo-800 
text-white px-6 py-3 rounded-lg 
font-medium shadow-lg shadow-purple-800/40 
transition-all duration-500 hover:-translate-y-1"
            >
              ameerhamza450505@gmail.com
            </a>
          </div>
          {/* RIGHT SIDE */}
          <div className="right-side w-full md:w-1/2 border border-[#3c3736] rounded-3xl px-6 py-8 bg-[#111111]/60 backdrop-blur-md shadow-2xl shadow-black/40 transition-all duration-700 hover:shadow-purple-800/30">
            <form className="flex flex-col gap-4 p-4 max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4 md:flex-row gap-4">
                <div>
                  <p>Your Name</p>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                    required
                    {...register('name', {
                        required: {
                          value: true,
                          message: 'Please enter your name',
                        },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less',
                        },
                      })}
                  />
                </div>
                <div>
                  <p>Your Email</p>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                    required
                    {...register('email', {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                  />
                </div>
              </div>
              <div id="subject">
                <p>Subject</p>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                  required
                  {...register('subject', {
                        required: {
                          value: true,
                          message: 'Please enter a subject',
                        },
                        maxLength: {
                          value: 75,
                          message: 'Subject cannot exceed 75 characters',
                        },
                      })}
                />
              </div>
              <div id="message">
                <p>Message</p>
                <textarea
                  rows={5}
                  cols={30}
                  placeholder="Hello, I`d like to discuss a project..."
                  className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                  required
                  {...register('message', {
                        required: true,
                      })}
                ></textarea>
              </div>
              <button type='submit' className="bg-gradient-to-r from-indigo-700 to-purple-700 w-full sm:w-auto py-3 px-6 rounded-xl text-white font-semibold duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/40">
                  <p>
                Send Message
                  </p>
              </button>
              {alertInfo.display && (
        <div
          className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
          role='alert'
        >
          {alertInfo.message}
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
            onClick={() =>
              setAlertInfo({ display: false, message: '', type: '' })
            } // Clear the alert when close button is clicked
          ></button>
        </div>
      )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
