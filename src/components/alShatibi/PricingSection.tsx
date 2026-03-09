import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const CheckIcon = () => (
  <svg
    width="18"
    height="13"
    viewBox="0 0 18 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[1.125rem] sm:w-5 md:w-[1.375rem] mx-auto xl:w-6"
  >
    <path
      d="M17.2266 1.02344C17.5938 1.39062 17.5938 1.98437 17.2266 2.34766L6.91406 12.6641C6.54688 13.0312 5.95313 13.0312 5.58984 12.6641L0.273438 7.35156C-0.09375 6.98438 -0.09375 6.39063 0.273438 6.02734C0.640625 5.66406 1.23438 5.66016 1.59766 6.02734L6.24609 10.6758L15.8984 1.02344C16.2656 0.65625 16.8594 0.65625 17.2227 1.02344H17.2266Z"
      fill="#CC2002"
    ></path>
  </svg>
);

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

const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const price = isMonthly ? "$4.50" : "$3.75";
  const period = "/ month";

  const features = [
    "100+ Courses",
    "Personalized Dashboard",
    "Biweekly Q&A with  Sheikh Ahmed",
  ];
  const bulletPoints = [
    "Start with a free account to explore select courses before upgrading.",
    "Watch anytime, anywhere—on mobile, tablet or desktop.",
    "Whether you're just starting or seeking deeper study, there's something here for you.",
  ];

  return (
    <div className="bg-[#1e1519]">
      <div className="relative z-10 pt-12 md:pt-16 xl:pt-24 xl:pb-16 2xl:pt-28 2xl:pb-20">
        <div
          id="pricingSection"
          className="relative px-6 md:px-8 lg:px-10 xxl:px-24"
        >
          <div className="justify-between lg:flex gap-x-10 xl:gap-x-20">
            <div className="lg:max-w-[35%] xl:max-w-[30%] 2xl:max-w-[35%] w-full">
              <AnimateOnScroll>
                <div className="mx-0 tag-large maroon">
                  Ready to begin your journey?
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <h2 className="text-black mb-8 font-light font-heading has-6-xl-font-size lg:mb-10 dark:text-grey-brand">
                  Choose Your Plan
                </h2>
              </AnimateOnScroll>
              <ul className="lg:max-w-[325px] flex flex-col gap-2 w-full">
                {bulletPoints.map((point, i) => (
                  <AnimateOnScroll key={i} delay={0.15 + i * 0.1}>
                    <li className="flex gap-x-3">
                      <svg
                        width="18"
                        height="13"
                        viewBox="0 0 18 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-1 shrink-0"
                      >
                        <path
                          d="M17.2266 1.02344C17.5938 1.39062 17.5938 1.98437 17.2266 2.34766L6.91406 12.6641C6.54688 13.0312 5.95313 13.0312 5.58984 12.6641L0.273438 7.35156C-0.09375 6.98438 -0.09375 6.39063 0.273438 6.02734C0.640625 5.66406 1.23438 5.66016 1.59766 6.02734L6.24609 10.6758L15.8984 1.02344C16.2656 0.65625 16.8594 0.65625 17.2227 1.02344H17.2266Z"
                          fill="#CC2002"
                        ></path>
                      </svg>
                      <span className="text-base text-white lg:text-lg xl:text-xl">
                        {point}
                      </span>
                    </li>
                  </AnimateOnScroll>
                ))}
              </ul>
              <AnimateOnScroll delay={0.45}>
                <div className="flex flex-wrap mt-6 gap-y-3 sm:gap-8 lg:gap-3 lg:flex-col lg:mt-8">
                  <a
                    className="inline-block text-base text-white underline cursor-pointer xl:text-lg underline-offset-2 decoration-red-accent text-left"
                    href="#"
                    rel="noopener noreferrer"
                  >
                    Learn about gifting
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll
              delay={0.2}
              className="relative lg:max-w-[65%] w-full mt-12 lg:mt-0"
            >
              <div className="relative flex lg:absolute lg:left-0 lg:top-0 rounded-full bg-black bg-opacity-50 w-[max-content] z-20">
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`${
                    isMonthly ? "bg-[#4C0B00]" : "bg-black"
                  } px-3 xl:px-4 pt-2.5 pb-2 sm:pt-3.5 sm:pb-2.5 text-[13px] sm:text-sm leading-none rounded-3xl xl:rounded-full xl:pb-4 xl:pt-5 xl:text-base text-grey-brand`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`${
                    !isMonthly ? "bg-[#4C0B00]" : "bg-black"
                  } px-3 xl:px-4 pt-2.5 pb-2 sm:pt-3.5 sm:pb-2.5 text-[13px] sm:text-sm leading-none rounded-3xl xl:rounded-full xl:pb-4 xl:pt-5 xl:text-base text-grey-brand`}
                >
                  Annual{" "}
                  <span className="text-[#e29591] font-bold">(save 17%)</span>
                </button>
              </div>
              <div className="tbg absolute right-0 top-0 sm:top-[5%] sm:h-[95%] lg:-top-[5%] w-[37%] sm:w-1/2 bg-black h-full lg:h-[105%] rounded-lg bg-opacity-50"></div>
              <table className="relative z-10 w-full mt-4 md:mt-0">
                <thead>
                  <tr>
                    <th className="w-1/4 sm:w-1/3"></th>
                    <th className="w-1/3">
                      <span className="font-light font-heading has-5-xl-font-size text-grey-brand">
                        Premium
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-1/4 border-b border-white sm:w-1/3 border-opacity-10">
                      <span className="text-[15px] sm:text-base text-white md:text-lg xl:text-xl xl:text-[1.375rem] 2xl:text-2xl">
                        Price
                      </span>
                    </td>
                    <td className="w-1/3 pb-4 text-center border-b border-white sm:py-5 xl:py-6 border-opacity-10">
                      <span className="text-[2rem] font-light text-white font-heading md:text-4xl lg:text-5xl xl:text-[3.375rem] 2xl:text-6xl">
                        {price}
                      </span>
                      <span className="block text-sm text-white opacity-50 sm:text-base xl:text-lg">
                        {period}
                      </span>
                    </td>
                  </tr>
                  {features.map((feat) => (
                    <tr key={feat}>
                      <td className="w-1/4 py-4 border-b border-white sm:py-5 xl:py-6 sm:w-1/3 border-opacity-10">
                        <span className="text-[15px] sm:text-base text-white md:text-lg xl:text-xl xl:text-[1.375rem] 2xl:text-2xl">
                          {feat}
                        </span>
                      </td>
                      <td className="w-1/3 py-4 text-center border-b border-white sm:py-5 xl:py-6 border-opacity-10">
                        <span className="flex justify-center">
                          <CheckIcon />
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="w-1/4 py-4 border-b border-white sm:py-5 xl:py-6 sm:w-1/3 border-opacity-10">
                      <span className="block text-[11px] sm:text-xs font-semibold md:text-sm xl:text-base text-red-accent">
                        Coming soon
                      </span>
                      <span className="text-sm sm:text-base text-white md:text-lg xl:text-xl xl:text-[1.375rem] 2xl:text-2xl">
                        Workbooks &amp; Quizzes
                      </span>
                    </td>
                    <td className="w-1/3 py-4 text-center border-b border-white sm:py-5 xl:py-6 border-opacity-10">
                      <span className="flex justify-center">
                        <CheckIcon />
                      </span>
                    </td>
                  </tr>
                  <tr className="hidden sm:table-row">
                    <td className="w-1/4 py-4 sm:py-5 xl:py-6 sm:w-1/3"></td>
                    <td className="w-1/3 py-4 text-center sm:py-5 xl:py-6">
                      <Link
                        to="/contact"
                        className="h-10 px-6 text-base min-w-fit cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 inline-flex items-center justify-center font-semibold primary-btn maroon no-margin !border-0"
                      >
                        <span className="flex items-center flex-shrink-0 text-sm md:text-base text-white font-semibold inline-flex items-center">
                          Start 7-Day Free Trial
                          <span className="icon !-mt-[2px]">
                            <ArrowIcon />
                          </span>
                        </span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
