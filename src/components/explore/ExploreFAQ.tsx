import { useState } from "react";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

interface FAQItem { question: string; answer: string; }
interface ExploreFAQProps { faqs: FAQItem[]; }

const ExploreFAQ = ({ faqs }: ExploreFAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="bg-[rgb(30_21_25/var(--tw-bg-opacity,1))] pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 faq">
      <div className="container mx-auto px-6 md:px-8 lg:px-10">
        <div className="max-w-[1410px] mx-auto">
          <AnimateOnScroll>
            <h2 className="text-center font-heading text-[#ffeada] text-3xl md:text-4xl lg:text-5xl xl:text-[3.75rem]" style={{ fontWeight: 400 }}>
              Frequently Asked Questions
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="max-w-screen-lg mx-auto pt-12 md:pt-16 lg:pt-20">
          <ul>
            <div className="customfaq-wrapper flex flex-col ml-0 gap-y-4 sm:gap-y-5 xl:gap-y-4">
              {faqs.map((faq, index) => (
                <AnimateOnScroll key={index} delay={index * 0.08}>
                  <li className={`faq__item relative p-6 transition duration-300 bg-black rounded-xl xl:rounded-[0.875rem] ${activeIndex === index ? "active" : ""}`}>
                    <button type="button" className="w-full appearance-none faq__item--title focus:outline-none group" onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}>
                      <div className="flex items-center justify-between">
                        <span className="mr-4 text-base font-semibold text-left text-white lg:text-lg xl:text-xl">{faq.question}</span>
                        <svg className={`flex-shrink-0 faq__item--icon w-4 h-4 mb-1 transition duration-300 transform fill-current lg:w-5 lg:h-5 text-[#841400] ${activeIndex === index ? "rotate-180" : "rotate-0"}`} viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.7064 11.8447C11.3189 12.2322 10.6814 12.2322 10.2939 11.8447L0.293945 1.84473C-0.0935553 1.45723 -0.0935554 0.819728 0.293945 0.432228C0.681446 0.0447284 1.31894 0.0447284 1.70644 0.432228L11.0002 9.72598L20.2939 0.432227C20.6814 0.0447267 21.3189 0.0447266 21.7064 0.432227C22.0939 0.819727 22.0939 1.45723 21.7064 1.84473L11.7064 11.8447Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </button>
                    <div className="relative overflow-hidden lg:text-lg xl:text-xl lg:pr-16 faq__item--content transition-all duration-300 ease-in-out" style={{ maxHeight: activeIndex === index ? "500px" : "0px", opacity: activeIndex === index ? 1 : 0 }}>
                      <div className="faq-content text-base text-white lg:text-lg lg:pr-16 pt-4"><p>{faq.answer}</p></div>
                    </div>
                  </li>
                </AnimateOnScroll>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExploreFAQ;
