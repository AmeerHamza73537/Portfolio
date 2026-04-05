import React, { useState, useLayoutEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import gsap from "gsap";

const HEADING_WORDS = ["Let's", "work", "together"];

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

  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading-word", {
        autoAlpha: 0,
        rotationX: 90,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
        transformOrigin: "50% 100%",
        scrollTrigger: {
          trigger: "#contact .contact-heading",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      ref={sectionRef}
      id="contact"
      className="relative flex flex-col justify-center section-pad section-divider overflow-hidden"
    >
      <div className="site-container">
        <p className="font-mono-label mb-8 md:mb-10">— 04. CONTACT</p>

        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-12 lg:gap-16 relative z-10">
          <div className="w-full lg:w-1/2 px-1 sm:px-2 text-center lg:text-left text-[#f5f0e8] space-y-4">
            <h2 className="contact-heading text-2xl sm:text-3xl md:text-4xl font-bold m-0 font-['DM_Sans',sans-serif]">
              {HEADING_WORDS.map((word, i) => (
                <span key={i} className="contact-heading-word">
                  {word}
                </span>
              ))}
            </h2>

            <p className="text-[#7a7a7a] text-sm sm:text-base">
              I am available for full-time roles & freelance projects.
            </p>

            <p className="text-[#7a7a7a] text-sm sm:text-base">
              My inbox is always open, whether you have a question or just want to say Hi.
            </p>

            <p className="text-[#7a7a7a] text-sm sm:text-base">I will try my best to get back to you.</p>

            <a href="mailto:ameerhamza450505@gmail.com" className="contact-mail-btn mt-2">
              ameerhamza450505@gmail.com
            </a>
          </div>

          <div className="contact-form-shell w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
            <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Your Name</p>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="contact-field"
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
                  <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Your Email</p>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="contact-field"
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
                <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Subject</p>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="contact-field"
                  {...register("subject", {
                    required: "Please enter a subject",
                    maxLength: {
                      value: 75,
                      message: "Subject cannot exceed 75 characters",
                    },
                  })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Message</p>
                <textarea
                  rows={5}
                  placeholder="Hello, I'd like to discuss a project..."
                  className="contact-field min-h-[120px] resize-y"
                  {...register("message", {
                    required: "Please enter a message",
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button type="submit" disabled={disabled} className="contact-send-btn">
                Send Message
              </button>

              {alertInfo.display && (
                <div
                  className={`mt-4 text-sm font-medium ${
                    alertInfo.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {alertInfo.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
