import { Link } from "react-router-dom";

const ArrowIcon = () => (
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
);

const socialLinks = [
  {
    href: "https://www.youtube.com/user/BayyinahInstitute",
    icon: (
      <svg
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.6923 0.788525C13.3059 0.953359 13.7912 1.43871 13.956 2.05226C14.2582 3.16948 14.2674 5.48633 14.2674 5.48633C14.2674 5.48633 14.2674 7.81233 13.9652 8.92039C13.8004 9.53395 13.315 10.0193 12.7015 10.1841C11.5934 10.4863 7.1337 10.4863 7.1337 10.4863C7.1337 10.4863 2.67399 10.4863 1.56593 10.1841C0.95238 10.0193 0.467034 9.53395 0.302198 8.92039C0 7.80318 0 5.48633 0 5.48633C0 5.48633 0 3.16948 0.29304 2.06142C0.457875 1.44787 0.943224 0.96252 1.55678 0.797686C2.66484 0.495483 7.12454 0.486328 7.12454 0.486328C7.12454 0.486328 11.5842 0.486328 12.6923 0.788525ZM9.40476 5.48633L5.70513 7.62918V3.34347L9.40476 5.48633Z"
          fill="#ffffff"
        ></path>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/alshatibiacademy/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-3"
      >
        <path
          fill="#ffffff"
          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
        ></path>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/alshatibiacademy/",
    icon: (
      <svg
        viewBox="0 0 7 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-2"
      >
        <path
          fill="#ffffff"
          d="M5.0932 2.02078H6.70158C6.84955 2.02078 6.96964 1.90762 6.96964 1.76819V0.252598C6.96964 0.113164 6.84955 0 6.70158 0H5.0932C3.46766 0 2.1445 1.24632 2.1445 2.77858V4.54676H0.268063C0.120092 4.54676 0 4.65993 0 4.79936V6.31495C0 6.45438 0.120092 6.56755 0.268063 6.56755H2.1445V11.8721C2.1445 12.0115 2.2646 12.1247 2.41257 12.1247H4.02095C4.16892 12.1247 4.28901 12.0115 4.28901 11.8721V6.56755H6.16545C6.28072 6.56755 6.38312 6.49783 6.42011 6.39477L6.95624 4.87918C6.98358 4.80239 6.96964 4.71752 6.91924 4.65134C6.86831 4.58566 6.78789 4.54676 6.70158 4.54676H4.28901V2.77858C4.28901 2.36078 4.64982 2.02078 5.0932 2.02078Z"
        ></path>
      </svg>
    ),
  },
  {
    href: "https://x.com/alshatibiacademy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-3"
      >
        <path
          fill="#ffffff"
          d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z"
        ></path>
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <div className="px-6 sm:px-6 md:px-8 lg:px-10 xxl:px-24 bg-[#1e1519]">
      <footer className="py-6 md:py-9 pt-12 lg:pt-24 bg-[#1e1519] w-[100%] rounded-[5px]">
        <div className="relative z-10 px-0 max-w-[2000px]">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-[40%] xl:w-1/3">
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col lg:justify-between h-full max-w-[420px] sm:max-w-[350px] sm:mx-auto md:ml-0 md:max-w-[400px] xl:max-w-[450px]">
                  <h2 className="font-semibold sm:text-center md:text-left text-2xl xl:text-3xl 2xl:text-4xl leading-[1.2] text-white">
                    Clarity, delivered straight into your inbox, biweekly.
                  </h2>
                  <div className="flex flex-wrap items-end py-2 mt-6 border-l-2 sm:space-x-4 xs:space-x-3 sm:justify-center sm:border-l-0 sm:mt-4 md:justify-start md:border-l-2 xl:mt-8 border-red-accent">
                    {[
                      { val: "2,000hrs", label: "Video Content" },
                      { val: "190+", label: "Countries" },
                      { val: "100+", label: "Events" },
                    ].map((s) => (
                      <div key={s.val} className="px-3 xl:px-4 2xl:px-5">
                        <h3 className="text-xl xl:text-2xl font-semibold text-left 2xl:text-[1.625rem] text-white">
                          {s.val}
                        </h3>
                        <p className="mt-0 text-sm text-left text-white xl:text-base font-sans">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 md:mt-12 lg:mt-20 2xl:mt-28 w-full max-w-[420px] sm:max-w-[350px] md:max-w-[400px] md:w-auto lg:max-w-[450px] sm:mx-auto md:mx-0">
                  <div className="flex items-center w-full mt-2">
                    <input
                      type="email"
                      className="2xl:h-[50px] !leading-[0.9] mr-2 px-4 py-3 md:py-3.5 lg:py-4 text-sm xl:text-sm 2xl:text-base flex-1 rounded-xl xl:rounded-[0.875rem] placeholder:text-white/50 text-white transition-all duration-300 outline-transparent focus:outline-red-accent bg-transparent border border-white border-opacity-[33%] font-sans"
                      placeholder="Enter your email address"
                    />
                    <button
                      type="button"
                      className="h-10 px-6 text-base min-w-fit cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 flex items-center justify-center font-semibold primary-btn maroon no-margin !border-0 !py-4 md:!py-[1.35rem] lg:!py-6"
                    >
                      <span className="flex items-center font-sans flex-shrink-0 text-xs text-white leading-[0.813rem] sm:text-sm 2xl:text-base font-semibold inline-flex items-center">
                        Sign up{" "}
                        <span className="icon -mt-[2px]">
                          <ArrowIcon />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-[60%] xl:w-2/3">
              <div className="flex h-full md:pl-8 xl:pl-28 2xl:pl-40">
                <div className="flex flex-col justify-between flex-1 h-full sm:items-center md:items-start sm:flex-col md:flex-col">
                  <div className="flex flex-wrap sm:justify-center sm:w-2/3 md:justify-start md:w-full">
                    <div className="mt-10 mr-12 lg:mr-20 sm:text-center xl:mr-28 2xl:mr-40 md:mt-0 md:text-left md:w-auto">
                      <h3 className="text-lg font-bold text-white 2xl:text-xl">
                        Courses
                      </h3>
                      <ul className="flex flex-col mt-1 ml-0 text-base lg:mt-2 2xl:text-lg">
                        {[
                          { label: "Quran", href: "/explore/quran" },
                          { label: "Arabic", href: "/explore/arabic" },
                          {
                            label: "Learn to Read",
                            href: "/explore/learntoreadquran",
                          },
                        ].map((l) => (
                          <li key={l.label} className="!my-1 lg:!my-2">
                            <Link
                              className="inline-flex text-white link-color hover-underline font-sans"
                              to={l.href}
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-10 mr-12 lg:mr-20 sm:text-center xl:mr-28 2xl:mr-40 md:mt-0 md:text-left md:w-auto">
                      <h3 className="text-lg font-bold text-white 2xl:text-xl">
                        Company
                      </h3>
                      <ul className="flex flex-col mt-1 ml-0 text-base lg:mt-2 2xl:text-lg">
                        <li className="!my-1 lg:!my-2">
                          <Link
                            className="inline-flex text-white link-color hover-underline font-sans"
                            to="/contact"
                          >
                            Contact
                          </Link>
                        </li>
                        <li className="!my-1 lg:!my-2">
                          <a
                            className="inline-flex text-white link-color hover-underline font-sans"
                            href="#"
                            rel="noopener noreferrer"
                          >
                            Store
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="hidden w-full mt-10 sm:text-center sm:w-auto md:mt-12 xl:mt-28 md:text-left lg:block">
                    <h3 className="text-lg font-bold text-white 2xl:text-xl">
                      Follow us
                    </h3>
                    <div className="flex mt-4 sm:justify-center md:justify-start">
                      {socialLinks.map((s, i) => (
                        <a
                          key={i}
                          href={s.href}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="inline-flex items-center justify-center mr-2 transition duration-300 border-2 border-white border-opacity-25 rounded-full 2xl:mr-3 text-accent-maroon-low w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 link-color"
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t sm:flex-row md:pt-12 md:mt-12 lg:pt-16 lg:mt-16 border-white/10">
          <p className="text-sm text-white/60 font-sans">
            © 2025 Al Shatibi Academy. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white font-sans"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white font-sans"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
