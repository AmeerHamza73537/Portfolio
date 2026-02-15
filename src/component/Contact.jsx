import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

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
    message: "",
    type: "",
  });

  // Shows alert message for form submission feedback
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email
  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);
      const templateParams = { name, email, subject, message };
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );
      toggleAlert("Form submission was successful!", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Uh oh. Something went wrong.", "danger");
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center py-16 px-4 md:px-12 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background huge CONTACT text behind form */}
      <h1 className="absolute right-0 top-0 md:top-[-80px] -translate-y-0 text-[160px] md:text-[220px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 select-none pointer-events-none whitespace-nowrap opacity-30">
  CONTACT
</h1>
      {/* Content wrapper */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="left-side w-full md:w-1/2 px-4 text-center md:text-left text-white space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's work together
          </h1>
          <p className="text-gray-400 mb-4">
            I am available for full-time roles & freelance projects.
          </p>
          <p className="text-gray-400 mb-4">
            My inbox is always open, whether you have a question or just want to
            say Hi.
          </p>
          <p className="text-gray-400 mb-6">
            I will try my best to get back to you.
          </p>
          <a
            href="mailto:ameerhamza450505@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-purple-800/40 transition-all duration-500 hover:-translate-y-1"
          >
            ameerhamza450505@gmail.com
          </a>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.02 }}
          className="right-side w-full md:w-1/2 border border-[#3c3736] rounded-3xl px-6 py-8 bg-[#111111]/60 backdrop-blur-md shadow-2xl shadow-black/40 transition-all duration-700 hover:shadow-purple-800/30"
        >
          <form
            className="flex flex-col gap-4 p-4 max-w-3xl mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p>Your Name</p>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                  {...register("name", {
                    required: "Please enter your name",
                    maxLength: {
                      value: 30,
                      message: "Please use 30 characters or less",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="flex-1">
                <p>Your Email</p>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <p>Subject</p>
              <input
                type="text"
                placeholder="Project Inquiry"
                className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                {...register("subject", {
                  required: "Please enter a subject",
                  maxLength: { value: 75, message: "Subject cannot exceed 75 characters" },
                })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <p>Message</p>
              <textarea
                rows={5}
                placeholder="Hello, I'd like to discuss a project..."
                className="border border-[#50504e] p-3 rounded-xl bg-[#1d1d1c] text-gray-100 w-full focus:outline-none focus:border-purple-600 transition-colors"
                {...register("message", { required: "Please enter a message" })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="bg-gradient-to-r from-indigo-700 to-purple-700 w-full sm:w-auto py-3 px-6 rounded-xl text-white font-semibold duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/40"
            >
              Send Message
            </button>

            {alertInfo.display && (
              <div
                className={`alert alert-${alertInfo.type} mt-4`}
                role="alert"
              >
                {alertInfo.message}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
