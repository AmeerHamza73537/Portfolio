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

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

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
      className="relative min-h-screen flex flex-col justify-center
      py-16 sm:py-20 md:py-24
      px-4 sm:px-6 md:px-12
      max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background CONTACT Text */}
      <h1
        className="absolute
        right-1/2 translate-x-1/2 md:right-0 md:translate-x-0
        top-[-20px] sm:top-[-40px] md:top-[-80px]
        text-[70px] sm:text-[120px] md:text-[160px] lg:text-[220px]
        font-extrabold text-transparent bg-clip-text
        bg-gradient-to-r from-purple-600 to-indigo-600
        select-none pointer-events-none whitespace-nowrap
        opacity-20 sm:opacity-25 md:opacity-30"
      >
        CONTACT
      </h1>

      <div
        className="flex flex-col lg:flex-row
        justify-between items-center
        gap-12 lg:gap-16
        relative z-10"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2
          px-2 sm:px-4
          text-center lg:text-left
          text-white space-y-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Let's work together
          </h1>

          <p className="text-gray-400 text-sm sm:text-base">
            I am available for full-time roles & freelance projects.
          </p>

          <p className="text-gray-400 text-sm sm:text-base">
            My inbox is always open, whether you have a a question or just want to say Hi.
          </p>

          <p className="text-gray-400 text-sm sm:text-base">
            I will try my best to get back to you.
          </p>

          <a
            href="mailto:ameerhamza450505@gmail.com"
            className="inline-flex items-center justify-center
            text-sm sm:text-base
            bg-gradient-to-r from-purple-700 to-indigo-700
            hover:from-purple-800 hover:to-indigo-800
            text-white px-5 sm:px-6 py-3
            rounded-lg font-medium
            shadow-lg shadow-purple-800/40
            transition-all duration-500 hover:-translate-y-1"
          >
            ameerhamza450505@gmail.com
          </a>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="w-full lg:w-1/2
          border border-[#3c3736]
          rounded-3xl
          px-4 sm:px-6 py-6 sm:py-8
          bg-[#111111]/60 backdrop-blur-md
          shadow-2xl shadow-black/40
          transition-all duration-700
          hover:shadow-purple-800/30"
        >
          <form
            className="flex flex-col gap-4 sm:gap-5 max-w-2xl mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm sm:text-base">Your Name</p>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="border border-[#50504e] p-3 rounded-xl
                  bg-[#1d1d1c] text-gray-100 w-full
                  focus:outline-none focus:border-purple-600
                  transition-colors text-sm sm:text-base"
                  {...register("name", {
                    required: "Please enter your name",
                    maxLength: {
                      value: 30,
                      message: "Please use 30 characters or less",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm sm:text-base">Your Email</p>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="border border-[#50504e] p-3 rounded-xl
                  bg-[#1d1d1c] text-gray-100 w-full
                  focus:outline-none focus:border-purple-600
                  transition-colors text-sm sm:text-base"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm sm:text-base">Subject</p>
              <input
                type="text"
                placeholder="Project Inquiry"
                className="border border-[#50504e] p-3 rounded-xl
                bg-[#1d1d1c] text-gray-100 w-full
                focus:outline-none focus:border-purple-600
                transition-colors text-sm sm:text-base"
                {...register("subject", {
                  required: "Please enter a subject",
                  maxLength: {
                    value: 75,
                    message: "Subject cannot exceed 75 characters",
                  },
                })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm sm:text-base">Message</p>
              <textarea
                rows={5}
                placeholder="Hello, I'd like to discuss a project..."
                className="border border-[#50504e] p-3 rounded-xl
                bg-[#1d1d1c] text-gray-100 w-full
                focus:outline-none focus:border-purple-600
                transition-colors text-sm sm:text-base"
                {...register("message", {
                  required: "Please enter a message",
                })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="bg-gradient-to-r from-indigo-700 to-purple-700
              w-full sm:w-auto
              py-3 px-6 rounded-xl
              text-white font-semibold
              duration-500 hover:-translate-y-1
              hover:shadow-lg hover:shadow-purple-700/40"
            >
              Send Message
            </button>

            {alertInfo.display && (
              <div
                className={`mt-4 text-sm font-medium ${
                  alertInfo.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
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
