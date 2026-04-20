import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
// @ts-ignore
import "swiper/css";

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

interface VideoReview {
  id: string;
  student_name: string;
  testimonial: string;
  thumbnail_url: string | null;
  video_url: string | null;
  avatar_url: string | null;
}

// Fallback when no video testimonials in DB yet
const fallback: VideoReview[] = [
  { id: "f1", student_name: "Safiya Mahad Qamar", testimonial: "Al Shatibi TV has tremendous courses where Sheikh Ahmed takes ayat and stories from the Quran, teaching us the lessons Allah wants us to know.", thumbnail_url: "https://www.bayyinahtv.com/_nuxt/safiya.CVpc0YRW.png", video_url: null, avatar_url: null },
  { id: "f2", student_name: "William Prochazka", testimonial: "I can learn the meaning of the short Surahs I know in English, and make sure that every single time I perform Salat, I reflect on every word.", thumbnail_url: "https://www.bayyinahtv.com/_nuxt/william-large.Bzq-llNZ.png", video_url: null, avatar_url: null },
  { id: "f3", student_name: "Ayesha Salahuddin", testimonial: "It's a really effective use of my time when I'm commuting. Whether you're a student, a new mom, or working from home, you can just plug it in.", thumbnail_url: "https://www.bayyinahtv.com/_nuxt/ayesha-large.fU_n8CPQ.png", video_url: null, avatar_url: null },
];

const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.59961 23.6008V3.80078L21.7996 13.9114L8.59961 23.6008Z" fill="white"></path>
  </svg>
);

const VideoCard = ({ review }: { review: VideoReview }) => {
  const [playing, setPlaying] = useState(false);

  // Convert YouTube URL to embed
  const toEmbed = (url: string) => {
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
    return url;
  };

  const isDirectVideo = review.video_url && /\.(mp4|webm|mov)(\?|$)/i.test(review.video_url);
  const thumb = review.thumbnail_url || review.avatar_url || "https://www.bayyinahtv.com/_nuxt/safiya.CVpc0YRW.png";

  return (
    <div className="relative px-2 lg:px-2.5">
      <div className="relative">
        {playing && review.video_url ? (
          <div className="rounded-lg w-full aspect-1 lg:aspect-[1/1.7] overflow-hidden bg-black">
            {isDirectVideo ? (
              <video src={review.video_url} controls autoPlay className="w-full h-full object-cover" />
            ) : (
              <iframe
                src={toEmbed(review.video_url)}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={review.student_name}
              />
            )}
          </div>
        ) : (
          <>
            <img
              className="rounded-lg w-full aspect-1 lg:aspect-[1/1.7] object-top object-cover"
              src={thumb}
              alt={review.student_name}
            />
            {review.video_url && (
              <button
                onClick={() => setPlaying(true)}
                aria-label={`Play ${review.student_name}'s testimonial`}
                className="absolute bottom-3 left-3 w-[48px] h-[48px] border border-red-accent rounded-full flex justify-center items-center bg-black/30 hover:bg-black/50 transition"
              >
                <PlayIcon />
              </button>
            )}
          </>
        )}
      </div>
      <div className="mt-6">
        <p className="block text-base font-bold xl:text-lg text-grey-brand">
          <span className="text-red-accent">"</span> {review.testimonial}{" "}
          <span className="text-red-accent">"</span>
        </p>
        <p className="hidden sm:block mt-4 text-base text-white xl:text-lg">{review.student_name}</p>
      </div>
    </div>
  );
};

const JoinFamilySection = () => {
  const [reviews, setReviews] = useState<VideoReview[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, student_name, testimonial, thumbnail_url, video_url, avatar_url")
        .eq("is_published", true)
        .eq("type", "video")
        .order("display_order", { ascending: true })
        .limit(12);
      if (!cancelled && !error && data && data.length > 0) {
        setReviews(data as VideoReview[]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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
                <Link
                  to="/enroll"
                  className="primary-btn maroon !border-0 inline-flex items-center justify-center h-[44px] xl:h-[48px] px-6 xl:px-8 text-white text-sm xl:text-base font-semibold rounded-full"
                >
                  Apply to Join
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center h-[44px] xl:h-[48px] px-6 xl:px-8 text-white text-sm xl:text-base font-semibold rounded-full border border-white/30 hover:bg-white/10 transition"
                >
                  Explore Courses
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll
            delay={0.2}
            className="w-full -mx-2 lg:-mx-[1.125rem] review-video-slider"
          >
            <Swiper spaceBetween={0} slidesPerView="auto" className="">
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <VideoCard review={review} />
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
