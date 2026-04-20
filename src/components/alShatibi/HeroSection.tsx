import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const PlayIcon = () => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[11px] md:w-[13px]"
  >
    <path
      d="M1.875 15.8758L13.125 9.00084L1.875 2.12584V15.8758ZM0.957031 0.489123C1.55078 0.157092 2.27344 0.172717 2.85156 0.524279L14.1016 7.39928C14.6602 7.73912 15 8.34459 15 9.00084C15 9.65709 14.6602 10.2587 14.1016 10.6024L2.85156 17.4774C2.27344 17.8329 1.54688 17.8446 0.957031 17.5126C0.367188 17.1805 0 16.5555 0 15.8758V2.12584C0 1.44615 0.367188 0.821154 0.957031 0.489123Z"
      fill="white"
    />
  </svg>
);

const heroImages = [
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1920&q=80",
  "https://ik.imagekit.io/ihhlj9kpd/Gemini_Generated_Image_xq01nfxq01nfxq01-Photoroom.png",
  "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1920&q=80",
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&q=80",
];

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImg((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 6000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="relative flex flex-col justify-center px-6 sm:px-6 md:px-8 lg:px-10 xxl:px-24 pt-24 xs:pt-28 sm:pt-32 pb-12 sm:pb-0 min-h-[85vh] sm:min-h-screen overflow-hidden bg-accent-maroon-dark">
      {/* Background images with crossfade */}
      {heroImages.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: currentImg === i ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-maroon-dark via-accent-maroon-dark/85 to-accent-maroon-dark/40 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent-maroon-dark via-transparent to-accent-maroon-dark/60 z-[3]" />

      {/* Content - left aligned */}
      <div className="flex flex-col w-full sm:w-[60%] lg:w-[55%] xl:w-[50%] 2xl:w-[45%] relative z-20 xl:max-w-[680px] 2xl:max-w-[750px]">
        <div className="flex flex-col justify-center w-full">
          {/* Tag */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transitionDelay: "300ms",
            }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-widest uppercase bg-red-accent/10 text-white border border-[#d4af69]/15 mb-5 sm:mb-7">
              Begin Your Quran Journey
            </span>
          </div>

          {/* Heading */}
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transitionDelay: "500ms",
            }}
          >
            <h1 className="text-white mb-5 sm:mb-6 text-[2.65rem] !leading-[1.05] xs:text-5xl sm:text-[3.375rem] xs:!leading-[1.0] font-light font-heading md:text-[4.25rem] lg:text-7xl xl:text-[5.25rem] 2xl:text-8xl lg:mb-8">
              <span className="text-red-accent">Quran Studies</span>
              <br />
              Made Simple
            </h1>
          </div>

          {/* Description */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transitionDelay: "700ms",
            }}
          >
            <p className="mb-6 text-base text-white/75 lg:text-lg xl:text-xl lg:mb-8 max-w-[520px] font-sans leading-relaxed">
              Elevate your connection to Allah through the systematic and
              personalized study of His words.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(15px)",
            transitionDelay: "900ms",
          }}
        >
          <Link
            to="/enroll"
            className="group inline-flex items-center gap-3 h-12 px-7 text-sm md:text-base font-semibold text-white rounded-lg border transition-color duration-300 focus:outline-none focus:ring-0 flex items-center justify-center font-semibold primary-btn maroon trans no-margin"
          >
            <span className="font-sans">Apply to Join the Academy</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300">
              <PlayIcon />
            </span>
          </Link>
        </div>

        {/* Image dots / indicators */}
        <div
          className="flex gap-2 mt-8 sm:mt-12 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "1100ms",
          }}
        >
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                currentImg === i
                  ? "w-8 bg-red-accent"
                  : "w-3 bg-white/25 hover:bg-white/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
