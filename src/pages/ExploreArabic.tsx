import Seo from "@/components/seo/Seo";
import ExploreHero from "@/components/explore/ExploreHero";
import CourseSlider from "@/components/explore/CourseSlider";
import WhyBayyinahCards from "@/components/explore/WhyBayyinahCards";
import ExploreFAQ from "@/components/explore/ExploreFAQ";
import ExploreCTA from "@/components/explore/ExploreCTA";

const courses = [
  {
    title: "Learn to Read Quran",
    description:
      "Begin your journey with the Arabic alphabet and proper pronunciation.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg",
    link: "/explore/learntoreadquran",
  },
  {
    title: "Dream Intensive",
    description:
      "Understand the Quran in its original language using a proven curriculum that has worked for over 10,000 people.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg",
    link: "#",
  },
  {
    title: "Short Arabic Courses",
    description:
      "Quick-start Arabic courses designed to give you foundational skills in reading and understanding Quranic Arabic.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg",
    link: "#",
  },
  {
    title: "Arabic Grammar (Nahw)",
    description: "Master the rules that govern Arabic sentence structure.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg",
    link: "#",
  },
  {
    title: "Reader Recap",
    description:
      "Improve your reading comprehension by engaging with Arabic texts and stories.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/10-1-scaled.jpg",
    link: "#",
  },
  {
    title: "Surah Yusuf",
    description:
      "Witness the behind-the-scenes process of tafsir and learn how grammar, context and scholarly dialogue guide interpretation.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Surah-Yusuf-scaled.jpg",
    link: "#",
  },
  {
    title: "Reader",
    description:
      "Improve your reading comprehension by engaging with Arabic texts.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/11-1-scaled.jpg",
    link: "#",
  },
  {
    title: "Reading Advanced Texts",
    description: "Enter the world of classical Arabic tafsir.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/13-1-scaled.jpg",
    link: "#",
  },
];

const faqs = [
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

const ExploreArabic = () => {
  return (
    <>
      <Seo
        title="Arabic Courses for Quran Understanding | أكاديمية الشاطبي"
        description="دورات اللغة العربية في أكاديمية الشاطبي: من قراءة الحروف لحد النحو والصرف—عشان تفهم القرآن بالعربي بثقة (مع دعم للتجويد والتحفيظ)."
        path="/explore/arabic"
        keywords="دورات لغة عربية, تعلم العربية, نحو, صرف, عربية فصحى, قراءة عربية, فهم القرآن, Quranic Arabic, Arabic grammar, تعلم القرآن, تحفيظ, تجويد"
        lang="ar"
      />
      <div className="bg-accent-maroon-dark min-h-screen">
        <div>
          <ExploreHero
            backgroundImage="https://explore.bayyinahtv.com/wp-content/uploads/2025/06/new-to-islam-bg.png"
            heading="Dream: "
            subtitle="Our Flagship Arabic Program"
            description="Understand the Quran in its original language using a proven curriculum that has worked for over 10,000 people. Access the entire program for only <strong>$11/month</strong>."
            teacherImage="https://ik.imagekit.io/ihhlj9kpd/488614341_2493238344350710_6837098965978550032_n%20(1).jpg"
            teacherName=" Sheikh Ahmed Seraj"
            buttonText="Join Al Shatibi TV"
            buttonLink="/contact"
            heroImage="https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Website-Thumbnail-5.png"
          />
          <CourseSlider
            heading="Arabic Courses"
            description="Whether you're learning your first Arabic letter or diving into advanced grammar, these courses are designed to help you understand the Quran in its original language."
            courses={courses}
          />
          <WhyBayyinahCards />
          <ExploreFAQ faqs={faqs} />
          <ExploreCTA
            heading="Start Your Journey Today."
            description="Learn step by step, at your own pace, only on Al Shatibi TV."
            buttonText="Start learning from just $11/month"
            buttonLink="/contact"
          />
        </div>
      </div>
    </>
  );
};

export default ExploreArabic;
