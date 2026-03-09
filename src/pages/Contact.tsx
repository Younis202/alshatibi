import Seo from "@/components/seo/Seo";
import { useState } from "react";

import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Contact Al Shatibi Academy | تواصل معنا"
        description="تواصل مع أكاديمية الشاطبي للاستفسار عن دورات تحفيظ القرآن، التجويد، وتعلم اللغة العربية على Al Shatibi TV."
        path="/contact"
        keywords="تواصل, أكاديمية الشاطبي, تحفيظ, تجويد, تعلم القرآن, تعلم العربية, دعم"
        lang="ar"
      />
      <div className="max-w-[2100px] mx-auto antialiased duration-300 transition-colors text-gray-800 dark:bg-[#1E1519] bg-[#F3F2F2]">
        <div className="mt-20 sm:mt-24 overflow-x-hidden dark:bg-dark-mode">
          <div className="flex w-full dark:bg-dark-mode bg-light-mode">
            <div className="flex flex-col overflow-hidden w-screen dark:bg-[#1E1519] bg-light-mode home-page">
              <div className="relative py-16 md:py-20 lg:py-28 px-6 md:px-8 lg:px-10 xxl:px-24 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
                <div className="absolute top-0 left-0 w-full h-full">
                <img
                  src="https://www.bayyinahtv.com/_nuxt/cta-bg.B_0vtGRp.png"
                  alt="Background"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative z-10 max-w-[800px] mx-auto text-center">
                <AnimateOnScroll>
                  <h2 className="text-black mb-4 font-light font-heading has-8-xl-font-size dark:text-grey-brand">
                    Get in Touch
                  </h2>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.1}>
                  <p className="text-white font-heading text-base lg:text-lg xl:text-xl">
                    We'd love to hear from you. Fill out the form below and
                    we'll get back to you as soon as possible.
                  </p>
                </AnimateOnScroll>
              </div>
            </div>

            <div className="relative py-12 md:py-16 lg:py-24 px-6 md:px-8 lg:px-10 xxl:px-24 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
              <div className="max-w-[720px] mx-auto">
                {submitted ? (
                  <AnimateOnScroll>
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#4C0B00] flex items-center justify-center">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 18 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.2266 1.02344C17.5938 1.39062 17.5938 1.98437 17.2266 2.34766L6.91406 12.6641C6.54688 13.0312 5.95313 13.0312 5.58984 12.6641L0.273438 7.35156C-0.09375 6.98438 -0.09375 6.39063 0.273438 6.02734C0.640625 5.66406 1.23438 5.66016 1.59766 6.02734L6.24609 10.6758L15.8984 1.02344C16.2656 0.65625 16.8594 0.65625 17.2227 1.02344H17.2266Z"
                            fill="#CC2002"
                          ></path>
                        </svg>
                      </div>
                      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                        Thank You!
                      </h2>
                      <p className="text-white font-heading text-base lg:text-lg xl:text-xl">
                        Your message has been sent successfully. We'll get back
                        to you soon, in shaa Allah.
                      </p>
                    </div>
                  </AnimateOnScroll>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnimateOnScroll>
                        <div>
                          <label className="block text-sm font-semibold text-[#ffeada] mb-2 font-heading">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-red-accent transition-all duration-300"
                            placeholder="Your first name"
                          />
                        </div>
                      </AnimateOnScroll>
                      <AnimateOnScroll delay={0.1}>
                        <div>
                          <label className="block text-sm font-semibold text-[#ffeada] mb-2 font-heading">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-red-accent transition-all duration-300"
                            placeholder="Your last name"
                          />
                        </div>
                      </AnimateOnScroll>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnimateOnScroll delay={0.15}>
                        <div>
                          <label className="block text-sm font-semibold text-[#ffeada] mb-2 font-heading">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-red-accent transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </AnimateOnScroll>
                      <AnimateOnScroll delay={0.2}>
                        <div>
                          <label className="block text-sm font-semibold text-[#ffeada] mb-2 font-heading">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-red-accent transition-all duration-300"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </AnimateOnScroll>
                    </div>
                    <AnimateOnScroll delay={0.25}>
                      <div>
                        <label className="block text-sm font-semibold text-[#ffeada] mb-2 font-heading">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white focus:outline-none focus:border-red-accent transition-all duration-300 appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 0.75rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                          }}
                        >
                          <option value="" className="bg-[#1E1519]">
                            Select a subject
                          </option>
                          <option value="enrollment" className="bg-[#1E1519]">
                            Course Enrollment
                          </option>
                          <option value="general" className="bg-[#1E1519]">
                            General Inquiry
                          </option>
                          <option value="support" className="bg-[#1E1519]">
                            Technical Support
                          </option>
                          <option value="feedback" className="bg-[#1E1519]">
                            Feedback
                          </option>
                          <option value="partnership" className="bg-[#1E1519]">
                            Partnership
                          </option>
                        </select>
                      </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.3}>
                      <div>
                        <label className="block text-sm font-semibold text-[#ffeada] mb-2 font-heading">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-base rounded-xl bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-red-accent transition-all duration-300 resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.35}>
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full sm:w-auto h-10 px-8 text-base min-w-fit cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 flex items-center justify-center font-semibold primary-btn maroon no-margin !border-0"
                        >
                          <span className="flex items-center font-heading flex-shrink-0 text-sm md:text-base text-white font-semibold">
                            Send Message
                            <span className="icon !-mt-[2px]">
                              <svg
                                viewBox="0 0 19 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[13px] md:w-[16px] lg:w-[18px]"
                              >
                                <path
                                  d="M18.0449 8.67997C18.2285 8.50419 18.334 8.25809 18.334 8.00028C18.334 7.74247 18.2285 7.50028 18.0449 7.32059L11.1699 0.758093C10.7949 0.398718 10.2012 0.414343 9.8457 0.789343C9.49023 1.16434 9.50195 1.75809 9.87695 2.11356L15.0566 7.06278H1.77148C1.25195 7.06278 0.833984 7.48075 0.833984 8.00028C0.833984 8.51981 1.25195 8.93778 1.77148 8.93778H15.0566L9.87305 13.8831C9.49805 14.2425 9.48633 14.8323 9.8418 15.2073C10.1973 15.5823 10.791 15.594 11.166 15.2386L18.041 8.67606L18.0449 8.67997Z"
                                  fill="white"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </button>
                      </div>
                    </AnimateOnScroll>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
