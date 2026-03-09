import Seo from "@/components/seo/Seo";
import ExploreHero from "@/components/explore/ExploreHero";
import ExploreFAQ from "@/components/explore/ExploreFAQ";
import ExploreCTA from "@/components/explore/ExploreCTA";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const reviews = [
  {
    text: "Subhanallah! I have been doing these lessons for only a week or so and now my knowledge of the Quran has increased greatly. May Allah (SWT) bless you for sharing your knowledge with others.",
    name: "Abdelaziz Bennani",
  },
  {
    text: "Wow, subhanallah! Thank y'all so much for this series. I am truly overwhelmed by this accomplishment. May Allah bless y'all.",
    name: "Jacie Mokidm",
  },
  {
    text: "Oh my God! Alhamdulilah! , thank you for your patience. I'm 52 and feel like my life only started.",
    name: "Al Shatibi TV member",
  },
  {
    text: "Alhamdulilah I'm 25 years old and finally able to read the Quran for the first time in my life. May Allah (SWT) reward all of you people. Ameen.",
    name: "Adam Halim",
  },
];

const faqs = [
  {
    question: "How does the live study work?",
    answer:
      "Join our free online Al Shatibi Family Community on Circle, where each week you'll be guided to watch 4 videos per week, ranging from 20 – 60mins each, on Al Shatibi TV (membership required).",
  },
  {
    question: "What is Al Shatibi TV?",
    answer:
      "Al Shatibi TV is an online platform that offers a wide range of high-quality, meticulously curated courses on Quran studies and Arabic language.",
  },
  {
    question: "How do I get started with Al Shatibi TV?",
    answer:
      "Simply create your account to begin your 7-Day free trial. You'll get full access to all premium courses, series and features. No commitment — cancel anytime.",
  },
  {
    question: "Is the full tafsir included?",
    answer: "Yes, a full tafsir is included in the Concise Commentary series.",
  },
  {
    question: "Is there a full Arabic curriculum?",
    answer:
      "Yes, Al Shatibi TV offers a comprehensive Arabic curriculum, ranging from how to read the alphabet to advanced reading texts.",
  },
  {
    question:
      "How is Al Shatibi TV different from other Quran study platforms?",
    answer:
      "Al Shatibi TV offers a unique, immersive experience with meticulously researched content presented in an easy-to-understand format.",
  },
  {
    question: "How do I access the personalized dashboard?",
    answer:
      "Once you log in to your Al Shatibi TV account, you can access your personalized dashboard from the main menu.",
  },
  {
    question: "How do I contact Al Shatibi TV for support?",
    answer:
      "For support, you can reach out to our customer service team at contact@alshatibi.com.",
  },
];

const LearnToReadQuran = () => {
  return (
    <>
      <Seo
        title="Learn to Read Quran (Beginners) | تعلم قراءة القرآن"
        description="تعلم قراءة القرآن من الصفر: حروف عربية، نطق صحيح، أساسيات التجويد—برنامج مناسب للمبتدئين ويمهد لطريق التحفيظ (حفظ القرآن)."
        path="/explore/learntoreadquran"
        keywords="تعلم قراءة القرآن, تعليم القرآن للمبتدئين, تحفيظ, حفظ القرآن, تجويد, حروف عربية, قراءة عربية, Quran reading, beginner Quran, Tajweed"
        lang="ar"
      />
      <div className="bg-accent-maroon-dark min-h-screen">
        <div>
          <ExploreHero
            backgroundImage="https://explore.bayyinahtv.com/wp-content/uploads/2025/06/image-83-removed.jpg"
            backgroundStyle="!bg-[left_70%_top] sm:!bg-center !bg-cover"
            label="Arabic Reading Series for Beginners"
            heading="Learn to Read Quran"
            description="A step-by-step journey to reading the words of Allah fluently and fearlessly. No prior experience needed. Access the entire series for only&nbsp;<strong>$11/month</strong> on Al Shatibi TV."
            teacherImage="https://ik.imagekit.io/ihhlj9kpd/488614341_2493238344350710_6837098965978550032_n%20(1).jpg"
            teacherName=" Sheikh Ahmed Seraj & Live Sessions by: Maheen Khan"
            buttonText="Watch Lessons on Al Shatibi TV"
            buttonLink="/contact"
            secondaryButtonText="Join Discussion on Circle"
            secondaryButtonLink="https://family.bayyinah.com/join?invitation_token=23c86ca84cc4af4e1b72004f3aad85beaccb68c9-63ec9d71-8ac0-4a78-a06d-127d8f5255e5"
            heroImage="https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg"
          />

        <section className="bg-accent-maroon-dark py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <AnimateOnScroll className="w-full lg:w-1/2">
                <iframe
                  title="The Best Way to Learn Arabic & Quran?"
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/XHXoJNaXyls"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl w-full aspect-video"
                ></iframe>
              </AnimateOnScroll>
              <div className="w-full lg:w-1/2">
                <AnimateOnScroll delay={0.1}>
                  <div className="secondary-btn maroon text-white text-xs uppercase tracking-wider inline-flex items-center no-margin border border-white/20 rounded-full px-4 py-1.5">
                    <span>What You'll Learn</span>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.15}>
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold font-heading mt-4">
                    <strong>
                      Connect with the Quran from the Very First Letter
                    </strong>
                  </h2>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.2}>
                  <p className="text-white text-base lg:text-lg mt-4 font-sans">
                    Whether you're starting from the very beginning or returning
                    after a long pause, <em>Learn to Read Quran</em> is designed
                    to meet you where you are.
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.25}>
                  <p className="text-white text-base lg:text-lg mt-4 font-sans">
                    This course offers a patient, structured path to help you
                    overcome that barrier. It's not just about recognizing
                    letters; it's about beginning a more intentional, personal
                    relationship with Allah's words.
                  </p>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent-maroon-dark py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2">
                <AnimateOnScroll>
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold font-heading">
                    <strong>This Series Includes:</strong>
                  </h2>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.1}>
                  <p className="text-white text-base lg:text-lg mt-4 font-sans">
                    <strong>Part 1: Build Your Foundation</strong>
                    <br />
                    Start with the basics: recognize Arabic letters, learn how
                    they sound and connect them into words.
                  </p>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.2}>
                  <p className="text-white text-base lg:text-lg mt-4 font-sans">
                    <strong>Part 2: Bring the Quran to Life</strong>
                    <br />
                    Deepen your reading with improved fluency, apply tajweed
                    rules and read longer passages.
                  </p>
                </AnimateOnScroll>
              </div>
              <AnimateOnScroll delay={0.15} className="w-full lg:w-1/2">
                <img
                  src="https://explore.bayyinahtv.com/wp-content/uploads/2025/06/come-back-now.webp"
                  alt=""
                  className="w-full max-w-[576px] mx-auto rounded-xl"
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="bg-[#4D0B00] py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2">
                <AnimateOnScroll>
                  <h2
                    className="font-heading text-[#ffeada] text-3xl md:text-4xl lg:text-5xl xl:text-[3.75rem]"
                    style={{ fontWeight: 400 }}
                  >
                    Why Al Shatibi TV
                  </h2>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.1}>
                  <p className="text-[#ffeada] mt-4 font-sans">
                    <a href="/contact" className="underline">
                      Explore free for 7 days
                    </a>
                    , then continue for only $11/month.
                  </p>
                </AnimateOnScroll>
              </div>
              <div className="w-full lg:w-1/2">
                <ul className="space-y-3">
                  {[
                    "Step-by-step Quran learning, made simple.",
                    "Taught by  Sheikh Ahmed Seraj.",
                    "Watch anytime, anywhere.",
                  ].map((item, i) => (
                    <AnimateOnScroll key={i} delay={i * 0.1}>
                      <li className="text-[#ffeada] text-base lg:text-lg flex items-start gap-2 font-sans">
                        <span className="text-[#cc2002] mt-1">✓</span> {item}
                      </li>
                    </AnimateOnScroll>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent-maroon-dark py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-10">
            <div className="max-w-[1410px] mx-auto">
              <AnimateOnScroll>
                <h2
                  className="text-center font-heading text-[#ffeada] text-3xl md:text-4xl lg:text-5xl xl:text-[3.75rem]"
                  style={{ fontWeight: 400 }}
                >
                  What Students Say About This Course
                </h2>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll delay={0.15}>
              <div className="mt-12 md:mt-16 lg:mt-20">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView="auto"
                  pagination={{ clickable: true }}
                  className="reviewslider"
                >
                  {reviews.map((review, index) => (
                    <SwiperSlide
                      key={index}
                      className="p-5 md:p-6 lg:p-8 bg-black rounded-xl !flex flex-col justify-between gap-5 md:gap-6 lg:gap-8 items-center !h-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      <div className="mb-6 text-center">
                        <span className="inline-flex mb-4 icon md:mb-5 lg:mb-6">
                          <svg
                            className="w-10 md:w-12 xl:w-14 2xl:w-16"
                            viewBox="0 0 74 74"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 37C0 16.5655 16.5655 0 37 0C57.4345 0 74 16.5655 74 37C74 57.4345 57.4345 74 37 74C16.5655 74 0 57.4345 0 37Z"
                              fill="#CC2002"
                            ></path>
                            <path
                              d="M35.07 41.05C35.07 44.02 33 46.27 29.85 46.27C26.7 46.27 24 43.75 24 39.25C24 33.67 28.23 28.9 33.72 28V31.33C30.57 31.96 28.23 34.21 28.23 36.82C28.77 36.46 29.49 36.19 30.66 36.19C33 36.19 35.07 37.9 35.07 41.05ZM49.65 41.05C49.65 44.02 47.49 46.27 44.34 46.27C41.28 46.27 38.49 43.75 38.49 39.25C38.49 33.67 42.72 28.9 48.3 28V31.33C45.15 31.96 42.81 34.21 42.81 36.73C43.35 36.37 44.16 36.19 45.24 36.19C47.58 36.19 49.65 37.9 49.65 41.05Z"
                              fill="#FFEADA"
                            ></path>
                          </svg>
                        </span>
                        <div className="text-sm md:text-[16px] lg:text-base text-white font-sans">
                          <p>{review.text}</p>
                        </div>
                      </div>
                      <div className="text-sm md:text-[16px] lg:text-base font-semibold text-center text-white font-sans">
                        {review.name}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <ExploreFAQ faqs={faqs} />
        <ExploreCTA
          heading="Your Journey Starts Here"
          description="The Quran was made easy. Let's take your first step together."
          buttonText="Watch Lessons on Al Shatibi TV"
          buttonLink="/contact"
          secondaryButtonText="Join Discussion on Circle"
          secondaryButtonLink="https://family.bayyinah.com/join?invitation_token=23c86ca84cc4af4e1b72004f3aad85beaccb68c9-63ec9d71-8ac0-4a78-a06d-127d8f5255e5"
        />
      </div>
    </div>
    </>
  );
};

export default LearnToReadQuran;
