import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

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

const CTASection = () => {
  return (
    <div className="relative pt-12 pb-16 md:pt-12 lg:pt-20 md:pb-20 lg:pb-44">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="https://www.bayyinahtv.com/_nuxt/cta-bg.B_0vtGRp.png"
          alt="Cta block bg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative px-6 md:px-8 lg:px-10 xxl:px-24">
        <div className="max-w-[800px] 2xl:max-w-[852px] w-full mx-auto text-center">
          <AnimateOnScroll>
            <h2 className="text-black mb-6 font-light text-center font-heading has-8-xl-font-size dark:text-grey-brand lg:mb-8 xl:mb-10">
              Your Journey Starts Here
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.15}>
            <p className="text-black font-sans mb-12 text-base text-center lg:text-xl xl:text-[1.375rem] 2xl:text-2xl dark:text-grey-brand lg:mb-16">
              At Al Shatibi, our vision is to empower individuals to form
              profound connections with the Quran, transcending surface-level
              understanding.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.3}>
            <Link
              to="/enroll"
              className="h-10 px-6 text-base min-w-fit cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 inline-flex items-center justify-center font-semibold primary-btn maroon no-margin !border-0 mx-auto"
            >
              <span className="flex items-center flex-shrink-0 text-sm md:text-base text-white font-semibold inline-flex items-center">
                Apply to Join the Academy
                <span className="icon !-mt-[2px]">
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
