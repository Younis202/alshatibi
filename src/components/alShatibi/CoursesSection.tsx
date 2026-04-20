import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
// @ts-ignore
import "swiper/css";

const StackIcon = () => (
  <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 31 34">
    <g clipPath="url(#clip0_12075_24369)">
      <path fill="#fff" d="M28.729 12.75c0-1.175-.866-2.125-1.938-2.125H3.541c-1.072 0-1.937.95-1.937 2.125v17c0 1.175.865 2.125 1.937 2.125h23.25c1.072 0 1.938-.95 1.938-2.125v-17ZM26.79 8.5c2.137 0 3.875 1.906 3.875 4.25v17c0 2.344-1.738 4.25-3.875 4.25H3.541c-2.137 0-3.875-1.906-3.875-4.25v-17c0-2.344 1.738-4.25 3.875-4.25h23.25Zm0-4.25c.533 0 .969.478.969 1.063 0 .584-.436 1.062-.969 1.062H3.541c-.533 0-.969-.478-.969-1.063 0-.584.436-1.062.969-1.062h23.25ZM23.885 0c.533 0 .968.478.968 1.063 0 .584-.435 1.062-.968 1.062H6.447c-.533 0-.968-.478-.968-1.063C5.479.479 5.914 0 6.447 0h17.438Z"></path>
    </g>
    <defs><clipPath id="clip0_12075_24369"><path fill="#fff" d="M0 0h31v34H0z"></path></clipPath></defs>
  </svg>
);

const programs = [
  {
    title: "Hifz & Tajweed",
    subtitle: "Quran Memorization",
    image: "https://www.bayyinahtv.com/_nuxt/course-1.CCzIhRaj.png",
  },
  {
    title: "Tafseer & Reflection",
    subtitle: "Understand the Quran",
    image: "https://www.bayyinahtv.com/_nuxt/course-2.6E1ZzyGy.png",
  },
  {
    title: "Quranic Arabic",
    subtitle: "Step-by-Step Arabic",
    image: "https://www.bayyinahtv.com/_nuxt/oourse-3.Cvgcu6V3.png",
  },
];

const CoursesSection = () => {
  return (
    <div className="relative pt-12 md:pt-16 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
      <div className="absolute top-0 left-0 w-full h-ful">
        <img src="https://www.bayyinahtv.com/_nuxt/faq-bg.oxgFDUJv.png" alt="Background image" />
      </div>
      <div className="max-w-[1280px] px-5 md:px-8 lg:px-8 w-full mx-auto relative z-10 opacity-300">
        <div className="pr-5 mb-10 text-center lg:mb-16 md:pr-8 lg:pr-0">
          <AnimateOnScroll>
            <div className="tag-large maroon white">Personalized Quran journey</div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h2 className="text-[#FFEADA] mb-6 font-light has-6-xl-font-size font-heading lg:mb-8 dark:text-grey-brand">
              Programs Designed to Meet You Where You're At
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-white font-sans text-base lg:text-lg xl:text-xl mb-4 max-w-[620px] lg:max-w-[700px] xl:max-w-[772px] w-full mx-auto">
              From your first letters of Arabic to deep Tafseer with our scholars — we tailor a path that matches your level, goals, and schedule.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="-mx-3 courses-slider">
          <Swiper spaceBetween={0} slidesPerView="auto" className="">
            {programs.map((course, i) => (
              <SwiperSlide key={course.title + i}>
                <AnimateOnScroll delay={i * 0.15}>
                  <Link to="/enroll" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <div className="px-2.5 overflow-hidden lg:px-3">
                      <div className="relative rounded-lg">
                        <div className="relative w-full h-[280px] md:h-[300px] lg:h-auto 2xl:h-[448px]">
                          <img src={course.image} className="object-cover w-full h-full rounded-xl md:rounded-2xl" alt={`${course.title} Image`} />
                        </div>
                        <div className="absolute top-0 left-0 flex flex-col justify-end w-full h-full p-5 sm:p-6 xl:p-8">
                          <span className="w-[20px] md:w-[24px] lg:w-[28px] xl:w-[30px] absolute top-[24px] right-[24px] xl:top-[32px] xl:right-[32px]"><StackIcon /></span>
                          <span className="text-base font-semibold lg:text-lg xl:text-xl text-grey-brand">{course.subtitle}</span>
                          <h2 className="text-black mt-1 mb-3 sm:mb-4 md:mb-5 font-light !text-[1.675rem] xs:!text-3xl xs:!leading-[1.15] sm:!text-[2rem] sm:!leading-[1.15] md:!text-[2rem] md:!leading-[1.15] lg:!text-4xl lg:!leading-[1.15] xl:!text-[2.65rem] xl:!leading-[1.15] font-heading dark:text-grey-brand">{course.title}</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
