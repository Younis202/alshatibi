import { Swiper, SwiperSlide } from "swiper/react";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
// @ts-ignore
import "swiper/css";

const StarIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.1449 0.652344C11.0199 0.265625 10.6605 0 10.2504 0C9.8402 0 9.48082 0.265625 9.35582 0.652344L7.37926 6.875H1.18785C0.785509 6.875 0.43004 7.12891 0.301134 7.50781C0.172227 7.88672 0.297227 8.30469 0.613634 8.55078L5.72301 12.5273L3.73082 18.7773C3.60582 19.168 3.75035 19.5977 4.08629 19.832C4.42223 20.0664 4.87535 20.0547 5.19957 19.8047L10.2504 15.875L15.3011 19.8008C15.6254 20.0547 16.0746 20.0664 16.4144 19.8281C16.7543 19.5898 16.8949 19.168 16.7699 18.7734L14.7777 12.5273L19.8871 8.55078C20.2035 8.30469 20.3285 7.88672 20.1996 7.50781C20.0707 7.12891 19.7152 6.875 19.3129 6.875H13.1214L11.1449 0.652344Z"
      fill="#CC2002"
    ></path>
  </svg>
);

const HalfStarIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.1449 0.652344C11.0199 0.265625 10.6605 0 10.2504 0C9.8402 0 9.48082 0.265625 9.35582 0.652344L7.37926 6.875H1.18785C0.785509 6.875 0.43004 7.12891 0.301134 7.50781C0.172227 7.88672 0.297227 8.30469 0.613634 8.55078L5.72301 12.5273L3.73082 18.7773C3.60582 19.168 3.75035 19.5977 4.08629 19.832C4.42223 20.0664 4.87535 20.0547 5.19957 19.8047L10.2504 15.875L15.3011 19.8008C15.6254 20.0547 16.0746 20.0664 16.4144 19.8281C16.7543 19.5898 16.8949 19.168 16.7699 18.7734L14.7777 12.5273L19.8871 8.55078C20.2035 8.30469 20.3285 7.88672 20.1996 7.50781C20.0707 7.12891 19.7152 6.875 19.3129 6.875H13.1254L11.1449 0.652344ZM10.2504 4.03125L11.5433 8.09766C11.6683 8.48828 12.0277 8.75 12.4379 8.75H16.5824L13.1136 11.4492C12.805 11.6914 12.6761 12.0977 12.7972 12.4727L14.0668 16.4688L10.8285 13.9492C10.6605 13.8164 10.4574 13.75 10.2543 13.75V4.03125H10.2504Z"
      fill="#CC2002"
    ></path>
  </svg>
);

const reviews = [
  {
    name: "Safiya Mahad Qamar",
    image: "https://www.bayyinahtv.com/_nuxt/safiya.CVpc0YRW.png",
    text: "Al Shatibi TV has tremendous courses where Sheikh Ahmed takes ayat and stories from the Quran, teaching us the lessons Allah wants us to know, including how to deal with our children.",
  },
  {
    name: "William Prochazka",
    image: "https://www.bayyinahtv.com/_nuxt/william-large.Bzq-llNZ.png",
    text: "I can learn the meaning of the short Surahs I know in English, and make sure that every single time I perform Salat, I reflect on every word. You really have to do that.",
  },
  {
    name: "Ayesha Salahuddin",
    image: "https://www.bayyinahtv.com/_nuxt/ayesha-large.fU_n8CPQ.png",
    text: "It's a really effective use of my time when I'm commuting. Whether you're a student, a new mom, or working from home, you can just plug it in or download the audio, which is great!",
  },
];

const AppStoreBadge = () => (
  <a
    href="https://apps.apple.com/us/app/alShatibi-tv/id1530635769"
    rel="noopener noreferrer"
    target="_blank"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 174 50"
      className="h-[36px] sm:h-[40px] lg:h-[44px] 2xl:h-[50px]"
    >
      <path
        fill="#000"
        d="M172.116 44.234c0 2.664-2.204 4.823-4.929 4.823H5.897c-2.724 0-4.935-2.159-4.935-4.823V5.773c0-2.664 2.211-4.83 4.935-4.83h161.289c2.726 0 4.929 2.166 4.929 4.83l.001 38.46Z"
      ></path>
      <path
        fill="#A6A6A6"
        d="M166.667 1.002c2.968 0 5.383 2.354 5.383 5.248v37.5c0 2.894-2.415 5.248-5.383 5.248H6.41c-2.968 0-5.383-2.354-5.383-5.248V6.25c0-2.894 2.415-5.248 5.383-5.248h160.257Zm0-1.002H6.41C2.886 0 0 2.814 0 6.25v37.5C0 47.186 2.886 50 6.41 50h160.257c3.524 0 6.41-2.814 6.41-6.25V6.25c0-3.436-2.886-6.25-6.41-6.25Z"
      ></path>
      <text
        x="87"
        y="35"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontFamily="sans-serif"
      >
        App Store
      </text>
    </svg>
  </a>
);

const GooglePlayBadge = () => (
  <a
    href="https://play.google.com/store/apps/details?id=com.zombiesoup.alShatibi&pli=1"
    rel="noopener noreferrer"
    target="_blank"
  >
    <img
      src="data:image/png;base64,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"
      alt="Get it on Google Play"
      className="h-[36px] sm:h-[40px] lg:h-[44px] 2xl:h-[50px]"
      style={{ width: "auto" }}
    />
  </a>
);

const JoinFamilySection = () => {
  return (
    <div className="relative pb-12 lg:py-24 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
      <div className="px-6 md:px-8 lg:px-10 !pr-0 xl:!pr-10 xxl:px-24 xxl:!pr-24 relative">
        <div className="lg:flex lg:justify-between gap-x-8 xl:gap-x-12 2xl:gap-x-16">
          <div className="flex-shrink-0 lg:max-w-[380px] xl:max-w-[420px] 2xl:max-w-[540px] w-full mb-12 lg:mb-0 pr-5 sm:pr-0">
            <AnimateOnScroll>
              <div className="mb-6 sm:mb-8 lg:mb-10 2xl:mb-12">
                <div className="flex mb-4 gap-x-2">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <HalfStarIcon />
                </div>
                <p className="dark:text-white font-sans text-base font-semibold text-white xl:text-lg">
                  Rated 4.5 across 25k members
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="text-black font-heading font-light max-w-[448px] has-6-xl-font-size dark:text-grey-brand mb-6 lg:mb-10 2xl:mb-12">
                Join the Global Al Shatibi Family
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="text-black font-sans text-base lg:text-lg xl:text-xl dark:text-grey-brand max-w-[640px] lg:max-w-full">
                Connect with a worldwide community of Quran learners, inspired
                by a shared journey of reflection, growth and divine guidance.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <div className="flex items-center gap-3 mt-6 sm:gap-4">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll
            delay={0.2}
            className="w-full -mx-2 lg:-mx-[1.125rem] review-video-slider"
          >
            <Swiper spaceBetween={0} slidesPerView="auto" className="">
              {reviews.map((review) => (
                <SwiperSlide key={review.name}>
                  <div className="relative px-2 lg:px-2.5">
                    <div className="relative">
                      <img
                        className="rounded-lg w-full aspect-1 lg:aspect-[1/1.7] object-top object-cover"
                        src={review.image}
                        alt="Video Thumbnail"
                      />
                      <button className="absolute bottom-3 left-3 w-[48px] h-[48px] border border-red-accent rounded-full flex justify-center items-center">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.59961 23.6008V3.80078L21.7996 13.9114L8.59961 23.6008Z"
                            fill="white"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="mt-6">
                      <p className="block text-base font-bold xl:text-lg text-grey-brand">
                        <span className="text-red-accent">"</span> {review.text}{" "}
                        <span className="text-red-accent">"</span>
                      </p>
                      <p className="hidden sm:block mt-4 text-base text-white xl:text-lg">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
};

export default JoinFamilySection;
