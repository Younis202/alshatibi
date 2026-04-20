import Seo from "@/components/seo/Seo";
import ExploreHeroMain from "@/components/explore/ExploreHeroMain";
import CourseSlider from "@/components/explore/CourseSlider";
import WhyBayyinahCards from "@/components/explore/WhyBayyinahCards";
import ExploreFAQ from "@/components/explore/ExploreFAQ";
import ExploreCTA from "@/components/explore/ExploreCTA";

const mostPopularCourses = [
  {
    title: "Learn to Read Quran",
    description:
      "Begin your journey with the Arabic alphabet and proper pronunciation. Designed for true beginners, this course builds confidence and clarity as you learn to read the Quran from scratch.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg",
    link: "/explore/learntoreadquran",
  },
  {
    title: "Dream Arabic",
    description:
      "Master Arabic from the ground up with a step-by-step journey designed by  Sheikh Ahmed. Build real understanding of the Quran—no shortcuts, no overwhelm, just clarity and confidence.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Bayyinah-Arabic-Dream-2.jpg",
    link: "/explore/arabic",
  },
  {
    title: "Divine Speech",
    description:
      "This course explores the Quran's structure, repetition and storytelling, revealing its divine design and deepening both understanding and conviction.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/08/Updated-BTV-Images-Dont-use-ratio.jpg",
    link: "#",
  },
  {
    title: "Deeper Look",
    description:
      "For those ready to sit with the Quran a little longer. These sessions unpack language, structure and deeper patterns you might have never noticed before.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Deeper-Look.jpg",
    link: "/explore/quran",
  },
  {
    title: "Concise Commentary",
    description:
      "This course offers clear, practical explanations of each Surah, verse by verse.  Sheikh Ahmed simplifies complex ideas to help you connect with the Quran's message in everyday life.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Concise-Commentary-2.jpg",
    link: "#",
  },
];

const quranCourses = [
  {
    title: "Learn to Read Quran",
    description:
      "Begin your journey with the Arabic alphabet and proper pronunciation.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Learn-to-Read-Quran-1-thumb.jpg",
    link: "/explore/learntoreadquran",
  },
  {
    title: "Divine Speech",
    description:
      "This course explores the Quran's structure, repetition and storytelling.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/08/Updated-BTV-Images-Dont-use-ratio.jpg",
    link: "#",
  },
  {
    title: "Heavenly Order",
    description:
      "This course uncovers the Quran's unique structure: how its ayahs and surahs are arranged with divine intent.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Heavenly-Order.jpg",
    link: "#",
  },
  {
    title: "Concise Commentary",
    description: "Clear, practical explanations of each Surah, verse by verse.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/06/Concise-Commentary-2.jpg",
    link: "#",
  },
  {
    title: "Deeper Look",
    description: "For those ready to sit with the Quran a little longer.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Deeper-Look.jpg",
    link: "/explore/quran",
  },
];

const arabicCourses = [
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
      "Understand the Quran in its original language using a proven curriculum.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/The-Qurans-Philosophy.jpg",
    link: "/explore/arabic",
  },
  {
    title: "Short Arabic Courses",
    description:
      "Quick-start Arabic courses designed to give you foundational skills.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Bayyinah-Arabic-Dream-2.jpg",
    link: "/explore/arabic",
  },
];

const faqs = [
  {
    question: "What is Al Shatibi TV?",
    answer:
      "Al Shatibi TV is an online platform that offers a wide range of high-quality, meticulously curated courses on Quran studies and Arabic language. It is designed to cater to learners at all levels.",
  },
  {
    question: "How do I get started with Al Shatibi TV?",
    answer:
      "Simply fill in our short application form and our team will reach out within 24 hours to guide you through enrollment, scheduling and your personalized learning plan.",
  },
  {
    question: "Is the full tafsir included?",
    answer:
      "Yes, a full tafsir is included in the Concise Commentary series.  Sheikh Ahmed Seraj is also working his way through the Deeper Look series, which provides more detailed insights into various Surahs.",
  },
  {
    question: "Is there a full Arabic curriculum?",
    answer:
      "Yes, Al Shatibi TV offers a comprehensive Arabic curriculum, ranging from how to read the alphabet to advanced reading texts. Our courses cover everything you need to master the Arabic language.",
  },
  {
    question:
      "How is Al Shatibi TV different from other Quran study platforms?",
    answer:
      "Al Shatibi TV offers a unique, immersive experience with meticulously researched content presented in an easy-to-understand format. Our platform features smart related-content suggestions, personalized dashboards and the ability to switch between video and audio formats for flexible learning.",
  },
  {
    question:
      "How do I access the personalized dashboard and course materials?",
    answer:
      "Once you log in to your Al Shatibi TV account, you can access your personalized dashboard from the main menu. Here, you can view your course progress, track completed and in-progress courses, and access all your materials.",
  },
  {
    question: "How do I contact Al Shatibi TV for support?",
    answer:
      "For support, you can reach out to our customer service team at contact@alshatibi.com. We are here to help with any questions or issues you may have.",
  },
];

const Explore = () => {
  return (
    <>
      <Seo
        title="Explore Quran & Arabic Courses | أكاديمية الشاطبي"
        description="اكتشف دورات القرآن الكريم واللغة العربية: تحفيظ، تجويد، تفسير، وتعلّم القراءة خطوة بخطوة عبر Al Shatibi TV." 
        path="/explore"
        keywords="استكشف دورات القرآن, دورات تحفيظ, تحفيظ اونلاين, حفظ القرآن, تجويد, تفسير, تعلم قراءة القرآن, تعلم العربية, دورات اللغة العربية, Quran courses, Hifz, Tajweed, Arabic courses"
        lang="ar"
      />
      <div className="bg-accent-maroon-dark min-h-screen">
        <div>
          <ExploreHeroMain />
          <CourseSlider
            heading="Most Popular"
            description="These courses include the complete package: on-demand videos, a guided study plan, downloadable resources and access to a learning community."
            courses={mostPopularCourses}
          />
          <div id="quran-students">
            <CourseSlider
              heading="Quran Students"
              description="Whether you're here to catch one ayah on your lunch break or spend hours exploring the structure of an entire Surah, insha'Allah you'll find yourself building a lasting relationship with the Quran."
              courses={quranCourses}
            />
          </div>
          <div id="arabic-students">
            <CourseSlider
              heading="Arabic Students"
              description="Whether you're learning your first Arabic letter or diving into advanced grammar, these courses are designed to help you understand the Quran in its original language."
              courses={arabicCourses}
            />
          </div>
          <WhyBayyinahCards />
          <ExploreFAQ faqs={faqs} />
          <ExploreCTA
            heading="Start Your Journey Today."
            description="Apply now and our team will help you find the perfect program for your goals."
            buttonText="Apply to Join the Academy"
            buttonLink="/enroll"
          />
        </div>
      </div>
    </>
  );
};

export default Explore;
