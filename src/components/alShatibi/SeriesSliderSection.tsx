import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
import { useCourses, formatDuration } from "@/hooks/useCourses";
import { useState } from "react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

const LessonsIcon = () => (
  <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
    <path fill="#FFEADA" d="M22.75 11.25V20c0 .691-.559 1.25-1.25 1.25h-15c-.691 0-1.25-.559-1.25-1.25v-8.75h17.5Zm0-1.25h-3.805l3.41-3.41c.243.226.395.55.395.91V10Zm-9.742 0 3.75-3.75h4.168L17.176 10h-4.168Zm-1.77 0H7.07l3.75-3.75h4.168L11.238 10ZM6.5 6.25h2.555L5.305 10H5.25V7.5c0-.691.559-1.25 1.25-1.25ZM24 10V7.5C24 6.121 22.879 5 21.5 5h-15A2.502 2.502 0 0 0 4 7.5V20c0 1.379 1.121 2.5 2.5 2.5h15c1.379 0 2.5-1.121 2.5-2.5V10Zm-11.559 2.586a.634.634 0 0 0-.629-.004.62.62 0 0 0-.316.543v6.25a.625.625 0 0 0 .945.54l5.313-3.126a.625.625 0 0 0 0-1.078l-5.313-3.125Zm3.762 3.664-3.453 2.031V14.22l3.453 2.031Z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
    <path fill="#FFEADA" d="M22.75 14a8.75 8.75 0 1 1-17.5 0 8.75 8.75 0 0 1 17.5 0ZM4 14a10 10 0 1 0 20 0 10 10 0 0 0-20 0Zm9.375-5.625V14c0 .344.281.625.625.625h4.375A.627.627 0 0 0 19 14a.627.627 0 0 0-.625-.625h-3.75v-5A.627.627 0 0 0 14 7.75a.627.627 0 0 0-.625.625Z" />
  </svg>
);

const PremiumBadge = () => (
  <div className="absolute flex top-[16px] left-[16px] gap-x-1 lg:gap-x-1.5 items-center px-2 py-1 sm:py-1.5 lg:py-2 md:top-[20px] md:left-[20px] rounded-md bg-black bg-opacity-[.85]">
    <svg className="w-3.5 md:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
      <path fill="#CC2002" stroke="#CC2002" strokeWidth=".25" d="M.36 6.589a.433.433 0 0 0 .028.551L9.92 17.595a.428.428 0 0 0 .32.142.428.428 0 0 0 .32-.141l.001-.001L20.09 7.14h.001a.433.433 0 0 0 .028-.552L15.505.439l-.1.074.1-.074a.435.435 0 0 0-.346-.173H5.32a.435.435 0 0 0-.347.173L.361 6.589Z" />
    </svg>
    <span className="inline-block text-[11px] md:text-xs uppercase mt-1 text-grey-brand">Premium</span>
  </div>
);

const SeriesSliderSection = () => {
  const { data: categories } = useCourses();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Build tabs from real categories
  const tabs = Array.from(
    new Map(
      (categories ?? [])
        .filter((c: any) => c.categories)
        .map((c: any) => [c.categories.slug, { slug: c.categories.slug, name: c.categories.name }])
    ).values()
  ).slice(0, 3);

  const filtered = activeTab
    ? (categories ?? []).filter((c: any) => c.categories?.slug === activeTab)
    : (categories ?? []);

  const currentTabName = activeTab
    ? (tabs.find((t) => t.slug === activeTab)?.name ?? "All Series")
    : (tabs[0]?.name ?? "All Series");

  return (
    <div className="relative py-12 md:py-16 lg:py-24 ">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="https://www.bayyinahtv.com/_nuxt/sliderbg.BCi6Xknq.png"
          alt="Slider bg"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-10 px-6 md:px-8 lg:px-10 xxl:px-24">
        <AnimateOnScroll>
          <div className="flex flex-wrap mb-4 md:mb-6 gap-x-6 sm:gap-x-8 lg:gap-x-12 xl:gap-x-16 item-center lg:mb-8 xl:mb-10">
            {tabs.length > 0 ? (
              tabs.map((tab, i) => {
                const isActive = activeTab === tab.slug || (!activeTab && i === 0);
                return (
                  <button
                    key={tab.slug}
                    onClick={() => setActiveTab(tab.slug)}
                    className={`flex items-center gap-2 cursor-pointer md:gap-3 font-heading font-light transition-opacity ${
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {i === 0 && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-[26px] md:w-[32px] lg:w-[38px] xl:w-auto">
                        <path d="M17.0498 6.43599C9.28704 8.24582 3.484 15.4177 3.484 24.006C3.484 33.9545 11.2795 42.0144 20.8822 42.0144C23.6803 42.0144 26.326 41.3287 28.6668 40.1147C19.1293 38.8444 11.7803 30.4023 11.7803 20.1952C11.7803 14.8669 13.7836 10.0332 17.0498 6.43599ZM0 24.006C0 12.0791 9.34148 2.40039 20.8822 2.40039C21.481 2.40039 22.069 2.42287 22.6569 2.47908C23.419 2.54653 24.0505 3.11983 24.2138 3.88423C24.3771 4.64863 24.0396 5.44676 23.3755 5.82896C18.5414 8.66175 15.2752 14.035 15.2752 20.1952C15.2752 29.3006 22.4065 36.6749 31.1927 36.6749C32.129 36.6749 33.0436 36.5962 33.9255 36.4276C34.6767 36.2927 35.4279 36.6749 35.7763 37.3831C36.1247 38.0913 35.9832 38.9343 35.4388 39.4852C31.6826 43.2622 26.5437 45.6004 20.8931 45.6004C9.34148 45.6116 0 35.9329 0 24.006Z" fill="#CC2002" />
                        <path d="M38.6328 23.0732L37.5217 19.9846C36.6158 17.4608 34.7013 15.4841 32.257 14.5487L29.2656 13.4015L32.257 12.2543C34.7013 11.3189 36.6158 9.34224 37.5217 6.81843L38.6328 3.72986L39.7439 6.81843C40.6498 9.34224 42.5643 11.3189 45.0087 12.2543L48 13.4015L45.0087 14.5487C42.5643 15.4841 40.6498 17.4608 39.7439 19.9846L38.6328 23.0732Z" fill="#CC2002" />
                      </svg>
                    )}
                    <h2 className="text-black text-3xl font-light tab-btn font-heading sm:text-[2rem] md:text-4xl lg:text-5xl xl:text-[3.375rem] 2xl:text-6xl dark:text-grey-brand">
                      {tab.name}
                    </h2>
                  </button>
                );
              })
            ) : (
              <div className="flex items-center gap-2 md:gap-3 opacity-100">
                <h2 className="text-black text-3xl font-light font-heading sm:text-[2rem] md:text-4xl lg:text-5xl xl:text-[3.375rem] 2xl:text-6xl dark:text-grey-brand">
                  Featured Series
                </h2>
              </div>
            )}
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.15}>
          <p className="dark:text-white text-black text-base max-w-[400px] md:max-w-[480px] lg:text-lg xl:text-xl xl:max-w-[530px] w-full">
            Curated series designed to take you deeper into the Quran—relatable, emotional and timeless guidance for the heart, mind and family.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.25}>
          <div className="flex items-center justify-between mt-10 mb-6 md:mt-15 lg:mt-20 lg:mb-8">
            <h2 className="text-black text-xl font-semibold md:text-2xl lg:text-[1.675rem] xl:text-3xl dark:text-grey-brand">
              {currentTabName}
            </h2>
            <Link
              to="/courses"
              className="cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 flex items-center justify-center font-semibold text-white border-red-accent bg-btn-gradient rounded-lg hover:bg-transparent hover:bg-gradient-to-r hover:from-transparent hover:to-transparent h-10 px-6 text-base rounded primary-btn maroon trans no-margin !bg-none"
            >
              <span>View all</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
      <div className="pl-5 md:pl-8 lg:pl-10 xxl:pl-24 pvslider">
        {filtered.length === 0 ? (
          <div className="text-grey-brand/50 font-sans py-10">No series available yet.</div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            navigation
            className="!pr-5 md:!pr-8 lg:!pr-10 xxl:!pr-24"
          >
            {filtered.map((s: any, i: number) => (
              <SwiperSlide key={s.id} style={{ width: "auto", maxWidth: "360px" }}>
                <AnimateOnScroll delay={i * 0.1}>
                  <Link to={`/courses/${s.slug}`}>
                    <div className="relative flex flex-col h-full overflow-hidden rounded-lg w-[300px] sm:w-[340px] md:w-[360px]">
                      <div className="relative">
                        {s.is_premium && <PremiumBadge />}
                        <img
                          className="w-full aspect-[1/.65] object-cover"
                          src={s.thumbnail_url ?? "https://www.bayyinahtv.com/_nuxt/video-thumb1.Dj3Wfmna.png"}
                          alt={s.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="relative flex flex-col justify-between flex-grow p-5 sm:p-6 lg:py-8 bg-[#4C0B00]">
                        <div className="mb-6 text-lg font-semibold md:mb-8 md:text-xl text-grey-brand line-clamp-2">
                          {s.title}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center mb-4 md:mb-5 gap-x-4 md:gap-x-5 xl:gap-x-6 gap-y-2">
                            <div className="flex items-center gap-x-1 md:gap-x-1.5 xl:gap-x-2">
                              <div className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px]">
                                <LessonsIcon />
                              </div>
                              <span className="mt-1 text-[15px] md:text-base leading-none xl:text-lg text-grey-brand">
                                {s.enrollment_count} enrolled
                              </span>
                            </div>
                            <div className="flex items-center gap-x-1 md:gap-x-1.5 xl:gap-x-2">
                              <div className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px]">
                                <ClockIcon />
                              </div>
                              <span className="mt-1 text-[15px] md:text-base leading-none xl:text-lg text-grey-brand">
                                {formatDuration(s.duration_minutes)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 md:gap-x-2.5">
                            {s.categories && (
                              <div className="px-2 pt-2 pb-1.5 md:pb-2 md:pt-2.5 text-xs md:text-sm leading-none border rounded text-grey-brand border-grey-brand/40">
                                {s.categories.name}
                              </div>
                            )}
                            <div className="px-2 pt-2 pb-1.5 md:pb-2 md:pt-2.5 text-xs md:text-sm leading-none border rounded text-grey-brand border-grey-brand/40 capitalize">
                              {s.level.replace("_", " ")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-accent-maroon-dark via-transparent to-accent-maroon-dark/30 pointer-events-none" />
    </div>
  );
};

export default SeriesSliderSection;
