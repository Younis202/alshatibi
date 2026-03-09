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
    title: "Divine Speech",
    description:
      "This course explores the Quran's structure, repetition and storytelling, revealing its divine design.",
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
    title: "Quran Passages Everyone Should Know",
    description:
      "This course explores key verses that highlight the Quran's main themes.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Quran-Passages-Everyone-Should-Know.jpg",
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
    link: "#",
  },
  {
    title: "The Quran's Philosophy",
    description: "This course explores how the Quran guides us to truth.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/The-Qurans-Philosophy.jpg",
    link: "#",
  },
  {
    title: "Hikmah in the Quran",
    description: "This course explores how the Quran defines and uses wisdom.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Hikmah-in-the-Quran.jpg",
    link: "#",
  },
  {
    title: "The Quran's Relationship with the Bible",
    description: "Parallels between the Quran, Torah and Gospels.",
    image:
      "https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Bible.jpg",
    link: "#",
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
    question:
      "How do I access the personalized dashboard and course materials?",
    answer:
      "Once you log in to your Al Shatibi TV account, you can access your personalized dashboard from the main menu.",
  },
  {
    question: "How do I contact Al Shatibi TV for support?",
    answer:
      "For support, you can reach out to our customer service team at contact@alshatibi.com.",
  },
];

const ExploreQuran = () => {
  return (
    <>
      <Seo
        title="Quran Courses: Hifz, Tajweed & Tafsir | أكاديمية الشاطبي"
        description="دورات القرآن الكريم في أكاديمية الشاطبي: تحفيظ (حفظ القرآن)، تجويد، تدبر وتفسير—برامج عملية تساعدك تبني علاقة ثابتة مع القرآن."
        path="/explore/quran"
        keywords="دورات قرآن, تحفيظ القرآن, حفظ القرآن, تجويد, تعليم التجويد, تفسير, تدبر, دروس قرآن اونلاين, Quran courses, Hifz, Tajweed, Tafsir"
        lang="ar"
      />
      <div className="bg-accent-maroon-dark min-h-screen">
        <div>
          <ExploreHero
            backgroundImage="https://explore.bayyinahtv.com/wp-content/uploads/2025/06/new-to-islam-bg.png"
            heading="Connect with<br/>The Quran"
            description="From in-depth studies to quick daily reflections, this section brings together all the Quran-related courses on Al Shatibi TV. Access all courses for only <strong>$11/month</strong>."
            teacherImage="https://ik.imagekit.io/ihhlj9kpd/488614341_2493238344350710_6837098965978550032_n%20(1).jpg"
            teacherName=" Sheikh Ahmed Seraj"
            buttonText="Start Your 7-Day Free Trial"
            buttonLink="/contact"
            heroImage="https://explore.bayyinahtv.com/wp-content/uploads/2025/09/Website-Thumbnail-8.png"
          />
          <CourseSlider
            heading="Go Beyond Recitation"
            description="Whether you're here to catch one ayah on your lunch break or spend hours exploring the structure of an entire Surah, insha'Allah you'll find yourself building a lasting relationship with the Quran, guided by  Sheikh Ahmed Seraj."
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

export default ExploreQuran;
