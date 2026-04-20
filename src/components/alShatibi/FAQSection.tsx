import { useState } from "react";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className={`flex-shrink-0 w-8 h-auto transition-transform duration-200 transform lg:w-10 ms-auto text-red-accent ${
      isOpen ? "rotate-180" : ""
    }`}
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    ></path>
  </svg>
);

const faqs = [
  {
    q: "What is Al Shatibi TV?",
    a: "Al Shatibi TV is an online platform that offers a wide range of high-quality, meticulously curated courses on Quran studies and Arabic language. It is designed to cater to learners at all levels.",
  },
  {
    q: "How do I get started with Al Shatibi TV?",
    a: "Simply fill in our short application form and our team will reach out within 24 hours to guide you through enrollment, scheduling and your personalized learning plan.",
  },
  {
    q: "Is the full tafsir included?",
    a: "Yes, a full tafsir is included in the Concise Commentary series. Sheikh Ahmed Seraj is also working his way through the Deeper Look series, which provides more detailed insights into various Surahs.",
  },
  {
    q: "Is there a full Arabic curriculum?",
    a: "Yes, Al Shatibi TV offers a comprehensive Arabic curriculum, ranging from how to read the alphabet to advanced reading texts. Our courses cover everything you need to master the Arabic language.",
  },
  {
    q: "How is Al Shatibi TV different from other Quran study platforms?",
    a: "Al Shatibi TV offers a unique, immersive experience with meticulously researched content presented in an easy-to-understand format. Our platform features smart related-content suggestions, personalized dashboards and the ability to switch between video and audio formats for flexible learning.",
  },
  {
    q: "How do I access the personalized dashboard and course materials?",
    a: "Once you log in to your Al Shatibi TV account, you can access your personalized dashboard from the main menu. Here, you can view your course progress, track completed and in-progress courses, and access all your materials.",
  },
  {
    q: "How do I contact Al Shatibi TV for support?",
    a: "Before reaching out, we recommend checking our FAQ page for quick answers to common questions. If you still need help, you can contact the Al Shatibi customer support team at contact@alShatibi.com. We're happy to help with any issues or questions you may have.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative w-[100%] flex justify-center items-center flex-col py-12 md:py-16 lg:py-24 px-6 md:px-8 lg:px-10 xl:px-0 bg-[rgb(30_21_25/var(--tw-bg-opacity,1))]">
      <div className="absolute -top-[50%] left-0 w-full h-auto">
        <img
          src="https://www.bayyinahtv.com/_nuxt/faq-bg.oxgFDUJv.png"
          className="w-full"
          alt="Faq bg"
        />
      </div>
      <div className="relative z-10 w-full">
        <AnimateOnScroll>
          <h2 className="text-white mb-12 text-3xl font-light text-center font-heading md:text-4xl lg:text-5xl xl:text-6xl dark:text-grey-brand lg:mb-16">
            Frequently Asked Questions
          </h2>
        </AnimateOnScroll>
        <div className="flex flex-col max-w-[1024px] w-full mx-auto gap-y-4 sm:gap-y-5 xl:gap-y-4">
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={i} delay={i * 0.08}>
              <div className="w-full flex flex-col bg-black mb-4 md:mb-6 p-6 last:mb-0 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="focus:outline-none inline-flex items-center p-0 text-base font-semibold text-white bg-black lg:text-lg dark:bg-black xl:text-xl dark:text-white dark:hover:bg-black w-full text-left"
                >
                  <span className="truncate">{faq.q}</span>
                  <ChevronIcon isOpen={openIndex === i} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openIndex === i ? "500px" : "0px",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <div className="px-0 pt-2.5 pb-3 text-base text-white md:pt-[1.125rem] xl:pt-[1.625rem] lg:text-lg xl:text-xl">
                    {faq.a}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
