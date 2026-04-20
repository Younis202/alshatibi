import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

const StarIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.1449 0.652344C11.0199 0.265625 10.6605 0 10.2504 0C9.8402 0 9.48082 0.265625 9.35582 0.652344L7.37926 6.875H1.18785C0.785509 6.875 0.43004 7.12891 0.301134 7.50781C0.172227 7.88672 0.297227 8.30469 0.613634 8.55078L5.72301 12.5273L3.73082 18.7773C3.60582 19.168 3.75035 19.5977 4.08629 19.832C4.42223 20.0664 4.87535 20.0547 5.19957 19.8047L10.2504 15.875L15.3011 19.8008C15.6254 20.0547 16.0746 20.0664 16.4144 19.8281C16.7543 19.5898 16.8949 19.168 16.7699 18.7734L14.7777 12.5273L19.8871 8.55078C20.2035 8.30469 20.3285 7.88672 20.1996 7.50781C20.0707 7.12891 19.7152 6.875 19.3129 6.875H13.1214L11.1449 0.652344Z" fill="#CC2002"></path>
  </svg>
);

const HalfStarIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.1449 0.652344C11.0199 0.265625 10.6605 0 10.2504 0C9.8402 0 9.48082 0.265625 9.35582 0.652344L7.37926 6.875H1.18785C0.785509 6.875 0.43004 7.12891 0.301134 7.50781C0.172227 7.88672 0.297227 8.30469 0.613634 8.55078L5.72301 12.5273L3.73082 18.7773C3.60582 19.168 3.75035 19.5977 4.08629 19.832C4.42223 20.0664 4.87535 20.0547 5.19957 19.8047L10.2504 15.875L15.3011 19.8008C15.6254 20.0547 16.0746 20.0664 16.4144 19.8281C16.7543 19.5898 16.8949 19.168 16.7699 18.7734L14.7777 12.5273L19.8871 8.55078C20.2035 8.30469 20.3285 7.88672 20.1996 7.50781C20.0707 7.12891 19.7152 6.875 19.3129 6.875H13.1254L11.1449 0.652344ZM10.2504 4.03125L11.5433 8.09766C11.6683 8.48828 12.0277 8.75 12.4379 8.75H16.5824L13.1136 11.4492C12.805 11.6914 12.6761 12.0977 12.7972 12.4727L14.0668 16.4688L10.8285 13.9492C10.6605 13.8164 10.4574 13.75 10.2543 13.75V4.03125H10.2504Z" fill="#CC2002"></path>
  </svg>
);

interface Testimonial {
  id: string;
  student_name: string;
  country: string | null;
  avatar_url: string | null;
  testimonial: string;
}

// Fallback testimonials when none in DB yet
const fallback: Testimonial[] = [
  { id: "f1", student_name: "Safiya Mahad Qamar", country: "UK", avatar_url: "https://www.bayyinahtv.com/_nuxt/safiya.CVpc0YRW.png", testimonial: "Al Shatibi Academy gave me a much deeper understanding of the Quran alhamdulillah and improved my Arabic substantially. The teachers genuinely care." },
  { id: "f2", student_name: "William Prochazka", country: "USA", avatar_url: "https://www.bayyinahtv.com/_nuxt/william.BjY05-E2.png", testimonial: "I can finally understand the meanings of the Surahs I recite in Salah. Every lesson connects me deeper to the words of Allah." },
  { id: "f3", student_name: "Ayesha Salahuddin", country: "Canada", avatar_url: "https://www.bayyinahtv.com/_nuxt/ayesha.CxL2c6_6.png", testimonial: "Flexible scheduling, world-class scholars, and a personal touch. Whether you're a working professional or a stay-at-home mom — they make it work." },
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, student_name, country, avatar_url, testimonial")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .limit(12);
      if (!cancelled && !error && data && data.length > 0) {
        setReviews(data as Testimonial[]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="relative pt-12 md:pt-16 lg:py-16 xl:py-[72px] bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
      <div className="absolute top-0 left-0 w-full rcardbg">
        <img className="w-full h-auto" src="https://www.bayyinahtv.com/_nuxt/review-card-bg.pAIk7hWR.png" alt="Bg" />
      </div>
      <div className="relative z-10 justify-between px-6 md:px-8 lg:px-10 xxl:px-24 md:flex md:gap-x-6 lg:gap-x-8">
        <div className="md:max-w-[250px] lg:max-w-[400px] flex-shrink-0 xl:max-w-[35%] w-full">
          <div className="flex flex-row gap-x-4 sm:gap-6 md:gap-4 lg:gap-8 xl:gap-8 xxl:gap-[60px] mb-8 mb:mb-10 xl:mb-12">
            {[
              { val: "500+", label: "Students worldwide" },
              { val: "+20y", label: "Teaching experience" },
              { val: "30+", label: "Countries reached" },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.val} delay={i * 0.1}>
                <div className="flex-1 text-center sm:text-left xl:text-center">
                  <h2 className="dark:text-white text-black mb-1 font-light font-heading has-5-xl-font-size !text-[#FFEADA]">
                    {stat.val}
                  </h2>
                  <p className="dark:text-white text-black font-sans text-sm sm:text-base lg:text-lg xl:text-xl !text-[#FFEADA]">
                    {stat.label}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={0.3}>
            <div className="text-center sm:text-left xl:text-center">
              <div className="flex justify-center sm:justify-start xl:justify-center mb-2 gap-x-2">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><HalfStarIcon />
              </div>
              <p className="dark:text-white font-sans text-base text-white lg:text-lg xl:text-xl">
                Loved by students from around the world
              </p>
            </div>
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll delay={0.2} className="reviewslider md:max-w-[57%] w-full z-10 mt-8 md:mt-0">
          <Swiper modules={[Pagination]} spaceBetween={24} slidesPerView="auto" pagination={{ clickable: true }} className="!pr-6 md:!pr-8 lg:!pr-10 xxl:!pr-24">
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="relative p-6 flex flex-col lg:flex-row gap-5 xl:gap-6 2xl:gap-8 rounded-xl md:rounded-2xl xl:rounded-3xl bg-[#111111] border border-[#343434] h-full">
                  <div className="shrink-0">
                    {review.avatar_url ? (
                      <img src={review.avatar_url} className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] xl:w-[64px] xl:h-[64px] 2xl:w-[74px] 2xl:h-[74px] rounded-full object-cover object-top" alt={review.student_name} />
                    ) : (
                      <div className="w-[48px] h-[48px] lg:w-[52px] lg:h-[52px] xl:w-[64px] xl:h-[64px] 2xl:w-[74px] 2xl:h-[74px] rounded-full bg-red-accent/20 text-red-accent flex items-center justify-center text-xl font-semibold">
                        {review.student_name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between shrink-0 lg:shrink grow lg:grow-0 lg:justify-start">
                    <div className="mb-6 text-base text-white">{review.testimonial}</div>
                    <div className="mt-auto">
                      <div className="text-base font-semibold text-white lg:text-lg">{review.student_name}</div>
                      {review.country && (
                        <div className="text-xs text-white/50 font-sans mt-0.5">{review.country}</div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default ReviewsSection;
