import React from 'react'

const Contact = () => {
  return (
    <>
      <section id="contact" className='mb-8 py-16'>
            <h1 className='text-center text-3xl font-bold mb-8'>Contact</h1>
            {/* CONTENT */}
            <div className=" flex justify-around items-center">
                {/* LEFT SIDE */}
                <div className="left-side">
                    <h1 className="text-4xl font-bold mb-4">Let's work together</h1>
                    <p className="text-gray-400 mb-4">I am available for full-time roles & freelance projects.</p>
                    <p className="text-gray-400 mb-4">My inbox is always open, whether you have a question or just want to say Hi.</p>
                    <p className="text-gray-400 mb-6">I will try my best to get back to you.</p>
                    <a href="mailto:contacthamza456@gmail.com"
                        className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-lg transition-colors"
                    >contactameer456@gmail.com</a>
                </div>
                {/* RIGHT SIDE */}
                <div className="right-side border border-[#3c3736] px-9 py-12 rounded-3xl">
                    <form className='flex flex-col gap-4 p-4 max-w-3xl mx-auto'>
                        <div className='flex gap-4'>
                          <div>
                            <p>Your Name</p>
                            <input type="text" placeholder='John Doe' className='border p-3 rounded-xl bg-[#1d1d1c] border-[#50504e]'/>
                          </div>
                          <div>
                            <p>Your Email</p>
                            <input type="email" placeholder='john@example.com' className='border p-3 rounded-xl bg-[#1d1d1c] border-[#50504e]'/>
                          </div>
                          
                        </div>
                        <div id="subject">
                          <p>Subject</p>
                          <input type="text" placeholder='Project Inquiry' className='w-107 border p-3 rounded-xl bg-[#1d1d1c] border-[#50504e]'/>
                        </div>
                        <div id="message">
                          <p>Message</p>
                          <textarea rows={5} cols={30} placeholder='Hello, I`d like to discuss a project...' className='w-107 border p-3 rounded-xl bg-[#1d1d1c] border-[#50504e]'></textarea>
                        </div>
                        <button className='bg-indigo-700 block py-3 rounded-xl duration-500 hover:bg-purple-700 hover:-translate-y-1'>Send Message</button>
                    </form>
                </div>
            </div>
            
      </section>
    </>
  )
}

export default Contact
