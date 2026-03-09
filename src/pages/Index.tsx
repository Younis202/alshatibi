import Seo from "@/components/seo/Seo";
import FAQSchema from "@/components/seo/FAQSchema";
import HeroSection from "@/components/alShatibi/HeroSection";
import ReviewsSection from "@/components/alShatibi/ReviewsSection";
import CoursesSection from "@/components/alShatibi/CoursesSection";
import WhyBayyinahSection from "@/components/alShatibi/WhyBayyinahSection";
import SeriesSliderSection from "@/components/alShatibi/SeriesSliderSection";
import PricingSection from "@/components/alShatibi/PricingSection";
import FAQSection from "@/components/alShatibi/FAQSection";
import JoinFamilySection from "@/components/alShatibi/JoinFamilySection";
import CTASection from "@/components/alShatibi/CTASection";

const homeFaqs = [
  { question: "What is Al Shatibi TV?", answer: "Al Shatibi TV is an online platform that offers a wide range of high-quality, meticulously curated courses on Quran studies and Arabic language. It is designed to cater to learners at all levels." },
  { question: "How do I get started with Al Shatibi TV?", answer: "Simply create your account to begin your 7-Day free trial. You'll get full access to all premium courses, series and features. No commitment — cancel anytime." },
  { question: "Is the full tafsir included?", answer: "Yes, a full tafsir is included in the Concise Commentary series. Sheikh Ahmed Seraj is also working his way through the Deeper Look series, which provides more detailed insights into various Surahs." },
  { question: "Is there a full Arabic curriculum?", answer: "Yes, Al Shatibi TV offers a comprehensive Arabic curriculum, ranging from how to read the alphabet to advanced reading texts. Our courses cover everything you need to master the Arabic language." },
  { question: "How is Al Shatibi TV different from other Quran study platforms?", answer: "Al Shatibi TV offers a unique, immersive experience with meticulously researched content presented in an easy-to-understand format. Our platform features smart related-content suggestions, personalized dashboards and the ability to switch between video and audio formats for flexible learning." },
  { question: "How do I access the personalized dashboard and course materials?", answer: "Once you log in to your Al Shatibi TV account, you can access your personalized dashboard from the main menu. Here, you can view your course progress, track completed and in-progress courses, and access all your materials." },
  { question: "How do I contact Al Shatibi TV for support?", answer: "Before reaching out, we recommend checking our FAQ page for quick answers to common questions. If you still need help, you can contact the Al Shatibi customer support team at contact@alShatibi.com. We're happy to help with any issues or questions you may have." },
];

const Index = () => {
  return (
    <>
      <Seo
        title="Al Shatibi TV - Quran Studies Made Simple | أكاديمية الشاطبي"
        description="تعلم القرآن الكريم بسهولة: حفظ القرآن (تحفيظ)، تجويد، تفسير، ودراسة منهجية للقرآن واللغة العربية عبر أكاديمية الشاطبي (Al Shatibi TV)."
        path="/"
        keywords="أكاديمية الشاطبي, الشاطبي, تحفيظ, تحفيظ القرآن, حفظ القرآن, حلقات تحفيظ, تجويد, تعلم التجويد, تعلم قراءة القرآن, تعليم القرآن, تفسير القرآن, قراءة القرآن, تعليم العربية, اللغة العربية, فصحى, نحو, صرف, Quran, Hifz, Tajweed, Arabic, Learn Quran"
        lang="ar"
      />
      <FAQSchema faqs={homeFaqs} />
      <div className="max-w-[2100px] mx-auto antialiased duration-300 transition-colors text-gray-800 dark:bg-[#1E1519] bg-[#F3F2F2]">
        <div className="overflow-x-hidden dark:bg-dark-mode">
          <div className="flex w-full dark:bg-dark-mode bg-light-mode">
            <div className="flex flex-col overflow-hidden w-screen dark:bg-[#1E1519] bg-light-mode home-page">
              <HeroSection />
              <ReviewsSection />
              <CoursesSection />
              <WhyBayyinahSection />
              <SeriesSliderSection />
              <PricingSection />
              <FAQSection />
              <JoinFamilySection />
              <CTASection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
