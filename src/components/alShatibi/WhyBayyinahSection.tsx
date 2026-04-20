import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const WhyBayyinahSection = () => {
  const cards = [
    {
      title: "Clear. Structured. Accessible",
      text: "No more guesswork. Follow a step-by-step path with smart filters to guide your Quran journey at your own pace.",
      image: "https://www.bayyinahtv.com/_nuxt/le-image1.1GFQfRsw.png",
    },
    {
      title: "Taught by Sheikh Ahmed Seraj",
      text: "Learn from a trusted teacher whose lessons are backed by a global research team that consults scholars across languages and traditions",
      image: "https://ik.imagekit.io/ihhlj9kpd/unna%D8%B3%D8%B3med%20copy.png",
    },
    {
      title: "Learn Your Way",
      text: "Watch or listen, track your progress and pick up right where you left off - anytime, on any device.",
      image: "https://www.bayyinahtv.com/_nuxt/le-image2.BbcuLHw6.png",
    },
  ];

  return (
    <div className="relative pt-4 pb-12 overflow-hidden leblock md:pb-16 lg:py-24 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
      <div className="relative z-10 px-6 md:px-8 lg:px-10 xxl:px-24">
        <div className="mb-10 text-center md:mb-12">
          <AnimateOnScroll>
            <div className="tag-large maroon">Why Al Shatibi TV</div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h2 className="text-black mb-6 font-light has-6-xl-font-size font-heading lg:mb-8 dark:text-grey-brand">
              A Proven Way of Learning
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="dark:text-white text-black font-sans mb-6 text-base lg:text-lg xl:text-xl max-w-[620px] lg:max-w-[700px] xl:max-w-[772px] w-full mx-auto">
              We're ushering in a new era of Quran education—one that is
              accessible, immersive and tailored to your needs as a modern
              learner.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.3}>
            <Link
              to="/enroll"
              className="h-10 px-6 text-base min-w-fit cursor-pointer border transition-color duration-300 focus:outline-none focus:ring-0 inline-flex items-center justify-center font-semibold primary-btn maroon no-margin !border-0 mx-auto"
            >
              <span className="flex items-center font-sans flex-shrink-0 text-sm md:text-base text-white font-semibold inline-flex items-center">
                Apply to Join the Academy
              </span>
            </Link>
          </AnimateOnScroll>
        </div>
        <div className="grid grid-cols-1 gap-10 md:gap-6 md:grid-cols-3 xl:gap-8">
          {cards.map((card, i) => (
            <AnimateOnScroll key={card.title} delay={i * 0.15}>
              <div className="relative flex flex-col items-center max-w-[500px] md:max-w-full mx-auto text-center gap-y-6 lg:gap-y-8">
                <img
                  className="w-full aspect-[1/.78] object-cover max-w-[300px] md:max-w-full rounded-xl md:rounded-2xl xl:rounded-3xl"
                  src={card.image}
                  alt="Card Image"
                />
                <div className="px-2 xl:px-4 2xl:px-10">
                  <h2 className="text-black mb-3 md:mb-4 lg:mb-6 text-xl font-semibold lg:text-2xl xl:text-[1.675rem] 2xl:text-3xl dark:text-grey-brand">
                    {card.title}
                  </h2>
                  <p className="dark:text-white text-black font-sans text-base lg:text-lg xl:text-xl">
                    {card.text}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyBayyinahSection;
