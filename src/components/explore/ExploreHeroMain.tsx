import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const ExploreHeroMain = () => {
  const categories = [
    { label: "Quran", href: "#quran-students" },
    { label: "Arabic", href: "#arabic-students" },
  ];

  return (
    <section
      className="pt-16 sm:pt-20 explore bg-[#260500] relative bg-top bg-no-repeat bg-[length:250%] md:bg-[length:200%] lg:bg-cover lg:bg-[length:100%]"
      style={{
        backgroundImage: `url(https://explore.bayyinahtv.com/wp-content/uploads/2025/08/BTV-Explore-Banner.jpg)`,
      }}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-10 z-20 relative">
        <div className="max-w-[1360px] mx-auto">
          <div className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24 text-center max-w-[800px] mx-auto">
            <AnimateOnScroll>
              <h2
                className="text-[#ffeada] leading-[1.1] font-heading"
                style={{
                  fontSize: "clamp(2.65rem, 5vw, 6rem)",
                  fontWeight: 400,
                }}
              >
                Explore Al Shatibi TV
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <p className="text-white text-lg md:text-xl lg:text-2xl mt-4 font-semibold">
                Find the Learning Path That Fits Your Life
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <p className="text-white text-base lg:text-lg mt-4">
                The Quran speaks to every heart, but each of us comes to it from
                a different place. Al Shatibi TV, the learning platform by
                Sheikh Ahmed Seraj, offers learning designed for where you are
                right now. So, what are you interested in?
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <div className="flex flex-wrap mt-4 items-center justify-center gap-x-2">
                {categories.map((cat) => (
                  <a
                    key={cat.label}
                    href={cat.href}
                    className="secondary-btn maroon text-white link-color"
                  >
                    <span>{cat.label}</span>
                  </a>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.4}>
              <div className="flex flex-wrap mt-4 items-center justify-center gap-x-2">
                <a href="/contact" className="primary-btn maroon text-white">
                  <span>Start Your 7-Day Free Trial</span>
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreHeroMain;
