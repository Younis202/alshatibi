import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { Link } from "react-router-dom";
import type { Swiper as SwiperType } from "swiper";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
// @ts-ignore
import "swiper/css";

interface CourseCard {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface CourseSliderProps {
  heading: string;
  description: string;
  courses: CourseCard[];
}

const CourseSlider = ({ heading, description, courses }: CourseSliderProps) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <section className="bg-[rgb(30_21_25/var(--tw-bg-opacity,1))] pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 overflow-hidden course-slider-wrapper">
      <div className="container mx-auto px-6 md:px-8 lg:px-10">
        <div className="w-full md:flex md:items-center md:justify-between md:gap-10 lg:gap-12 xl:gap-20 section-heading-wrapper">
          <AnimateOnScroll>
            <h2 className="font-heading shrink-0 font-light text-3xl xs:text-[2rem] md:text-4xl lg:text-5xl xl:text-[3.5rem] 2xl:text-6xl leading-[1.15] text-[#ffeada] mb-6 w-[170px] lg:w-[210px] xl:w-[250px]">
              {heading}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="w-full text-base text-white lg:text-lg xl:text-xl">
              {description}
            </p>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-12">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView="auto"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="course-slider cursor-grab"
            >
              {courses.map((course, index) => (
                <SwiperSlide
                  key={index}
                  className="max-w-[334px] w-full relative flex flex-col !h-auto overflow-hidden rounded-xl"
                >
                  <div className="w-full h-full flex flex-col">
                    <div className="relative">
                      <img
                        decoding="async"
                        src={course.image}
                        className="w-full aspect-[1/.65] lg:aspect-[1/.75] object-cover"
                        alt={course.title}
                      />
                    </div>
                    <div className="relative flex flex-col justify-between gap-3 flex-grow p-5 sm:p-6 lg:py-8 bg-[#4D0B00]">
                      <div className="font-heading text-xl md:text-2xl lg:text-3xl text-[#ffeada]">
                        {course.title}
                      </div>
                      <div className="text-base lg:text-lg text-white mt-0">
                        <p>{course.description}</p>
                      </div>
                      <div className="mt-4 lg:mt-6">
                        <Link
                          to="/enroll"
                          className="inline-block px-3 pt-2 pb-1.5 md:pb-2 md:pt-2.5 text-xs md:text-sm leading-none border rounded-xl text-[#ffeada] border-[#9ca3af]/40 link-color duration-200 hover:bg-[#ffeada] hover:text-black hover:border-[#ffeada]"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div className="relative z-10 flex items-center justify-end gap-3 mt-6 lg:gap-4 md:mt-8 lg:mt-10">
            <div className="flex gap-3 lg:gap-4 relative z-10 slider-navigation">
              <button
                className="flex items-center justify-center border border-white rounded-full w-9 md:w-10 lg:w-12 xl:w-13 h-9 md:h-10 lg:h-12 xl:h-13"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <svg
                  className="w-4 md:w-5 lg:w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.51731 11.2398C7.09449 11.6576 7.09449 12.3332 7.51731 12.7466L16.1537 21.2851C16.5765 21.7029 17.2603 21.7029 17.6786 21.2851C18.0969 20.8673 18.1014 20.1916 17.6786 19.7783L9.80686 11.9954L17.6831 4.21693C18.1059 3.79912 18.1059 3.1235 17.6831 2.71013C17.2603 2.29676 16.5765 2.29232 16.1582 2.71013L7.51731 11.2398Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center justify-center border border-white rounded-full w-9 md:w-10 lg:w-12 xl:w-13 h-9 md:h-10 lg:h-12 xl:h-13"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <svg
                  className="w-4 md:w-5 lg:w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6831 11.2398C18.1059 11.6576 18.1059 12.3332 17.6831 12.7466L9.04668 21.2851C8.62385 21.7029 7.94014 21.7029 7.52181 21.2851C7.10349 20.8673 7.09899 20.1916 7.52181 19.7783L15.3935 11.9998L7.51731 4.21693C7.09449 3.79912 7.09449 3.1235 7.51731 2.71013C7.94014 2.29676 8.62385 2.29232 9.04218 2.71013L17.6831 11.2398Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CourseSlider;
