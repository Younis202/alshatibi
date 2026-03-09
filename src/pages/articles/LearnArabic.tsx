import Seo from "@/components/seo/Seo";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { Link } from "react-router-dom";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const LearnArabic = () => {
  return (
    <>
      <Seo
        title="Learn Arabic for Quran Understanding | Al Shatibi Academy"
        description="Your complete guide to learning Classical Arabic (Fusha) to understand the Quran. Learn the basics of Nahw (grammar), Sarf (morphology), and build a strong foundation in Quranic Arabic."
        path="/articles/learn-arabic"
        keywords="Learn Arabic, Quranic Arabic, Classical Arabic, Fusha, Arabic grammar, Nahw, Sarf, Arabic morphology, understand Quran, Arabic for beginners, Arabic vocabulary, Islamic Arabic"
        lang="en"
      />
      <ArticleSchema
        title="Learn Arabic for Quran Understanding"
        description="Your complete guide to learning Classical Arabic (Fusha) to understand the Quran. Learn the basics of Nahw (grammar), Sarf (morphology), and build a strong foundation."
        url="https://alshatibi.vercel.app/articles/learn-arabic"
        datePublished="2025-03-09"
        dateModified="2025-03-09"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://alshatibi.vercel.app/" },
          { name: "Explore", url: "https://alshatibi.vercel.app/explore" },
          { name: "Learn Arabic", url: "https://alshatibi.vercel.app/articles/learn-arabic" }
        ]}
      />
      
      <article className="bg-accent-maroon-dark min-h-screen pt-24 sm:pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-[900px] mx-auto">
            
            {/* Breadcrumb */}
            <AnimateOnScroll>
              <nav className="mb-8 text-sm text-white/60">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Learn Arabic</span>
              </nav>
            </AnimateOnScroll>

            {/* Hero */}
            <AnimateOnScroll>
              <header className="mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs tracking-wider uppercase bg-red-accent/20 text-white border border-red-accent/30 mb-6">
                  Arabic Language
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading text-white mb-6 leading-tight">
                  Learn Arabic: <span className="text-red-accent">The Key to</span> Understanding the Quran
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans">
                  The Quran was revealed in clear Arabic. Learning the Arabic language opens the doors to deep reflection and understanding of Allah's words. In this guide, we take you on a systematic journey to learn Quranic Arabic from the beginning.
                </p>
              </header>
            </AnimateOnScroll>

            {/* Table of Contents */}
            <AnimateOnScroll delay={0.1}>
              <div className="bg-black/30 rounded-2xl p-6 md:p-8 mb-12 border border-white/10">
                <h2 className="text-xl font-heading text-white mb-4">Table of Contents</h2>
                <ul className="space-y-2 text-white/80 font-sans">
                  <li><a href="#why-arabic" className="hover:text-red-accent transition-colors">• Why Learn Arabic?</a></li>
                  <li><a href="#types" className="hover:text-red-accent transition-colors">• Types of Arabic</a></li>
                  <li><a href="#nahw" className="hover:text-red-accent transition-colors">• Nahw (Arabic Grammar)</a></li>
                  <li><a href="#sarf" className="hover:text-red-accent transition-colors">• Sarf (Morphology)</a></li>
                  <li><a href="#vocabulary" className="hover:text-red-accent transition-colors">• Building Quranic Vocabulary</a></li>
                  <li><a href="#roadmap" className="hover:text-red-accent transition-colors">• Learning Roadmap</a></li>
                  <li><a href="#resources" className="hover:text-red-accent transition-colors">• Resources & Courses</a></li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Content Sections */}
            <div className="prose prose-lg prose-invert max-w-none">
              
              <AnimateOnScroll>
                <section id="why-arabic" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Why Learn Arabic?</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      Allah says: <em>"Indeed, We have sent it down as an Arabic Quran that you might understand."</em> [Yusuf: 2]. Allah chose Arabic to be the language of His Noble Book for profound wisdom, as it is the richest and most precise language in expression.
                    </p>
                    <p>Benefits of learning Arabic for the Quran:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Direct Understanding:</strong> Understand Allah's words without translation intermediaries</li>
                      <li><strong>Deep Reflection:</strong> Discover subtle meanings and rhetorical beauty</li>
                      <li><strong>Easier Memorization:</strong> Understanding aids <Link to="/articles/hifz-quran" className="text-red-accent underline">Quran memorization</Link></li>
                      <li><strong>Understanding Sunnah:</strong> Comprehend the Prophet's ﷺ hadith in their original language</li>
                      <li><strong>Independence:</strong> Research Tafsir books and Islamic sciences on your own</li>
                    </ul>
                    <div className="bg-red-accent/10 border-l-4 border-red-accent p-4 rounded-lg my-6">
                      <p className="text-white font-medium">
                        💡 80% of Quranic words are repeated! Learning 300-500 words enables you to understand a large portion of the Quran.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="types" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Types of Arabic</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <div className="grid gap-4">
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">1. Classical Arabic (Quranic Arabic)</h3>
                        <p className="text-sm font-sans">The language of the Quran, Hadith, and classical Arabic poetry. This is our primary goal for understanding the Quran.</p>
                      </div>
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">2. Modern Standard Arabic (MSA)</h3>
                        <p className="text-sm font-sans">The language of media and contemporary books. Close to Fusha with some simplification.</p>
                      </div>
                      <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                        <h3 className="text-lg text-white font-heading mb-2">3. Colloquial Dialects</h3>
                        <p className="text-sm font-sans">Different dialects in each Arab country. Not our goal for understanding the Quran.</p>
                      </div>
                    </div>
                    <p className="mt-4">
                      <strong>Our focus at Al Shatibi Academy</strong> is on Quranic Arabic (Classical Fusha), which is the key to understanding the Quran, Sunnah, and Islamic heritage.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="nahw" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Nahw (Arabic Grammar)</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      <strong>Nahw</strong> is the science that studies the conditions of word endings in terms of I'rab (grammatical case) and Bina' (fixed form). Without it, Arabic sentences cannot be properly understood.
                    </p>
                    
                    <h3 className="text-xl text-white font-heading mt-6 mb-3">Grammar Fundamentals:</h3>
                    
                    <div className="bg-black/20 p-5 rounded-xl border border-white/10 mb-4">
                      <h4 className="text-white font-heading mb-2">The Nominal Sentence (Jumlah Ismiyyah)</h4>
                      <p className="text-sm font-sans">Begins with a noun, consisting of: <strong>Mubtada'</strong> (subject) and <strong>Khabar</strong> (predicate)</p>
                      <p className="text-sm mt-2 font-sans">Example: <span className="text-red-accent">اللهُ</span> (Mubtada') <span className="text-red-accent">أكبرُ</span> (Khabar) - "Allah is the Greatest"</p>
                    </div>

                    <div className="bg-black/20 p-5 rounded-xl border border-white/10 mb-4">
                      <h4 className="text-white font-heading mb-2">The Verbal Sentence (Jumlah Fi'liyyah)</h4>
                      <p className="text-sm font-sans">Begins with a verb, consisting of: <strong>Fi'l</strong> (verb) and <strong>Fa'il</strong> (doer) (and sometimes <strong>Maf'ul</strong> - object)</p>
                      <p className="text-sm mt-2 font-sans">Example: <span className="text-red-accent">قالَ</span> (verb) <span className="text-red-accent">رَبُّكَ</span> (doer) - "Your Lord said"</p>
                    </div>

                    <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                      <h4 className="text-white font-heading mb-2">Grammatical Cases (I'rab)</h4>
                      <ul className="text-sm space-y-1 font-sans">
                        <li>• <strong>Raf' (Nominative):</strong> For Fa'il, Mubtada', Khabar (Dammah)</li>
                        <li>• <strong>Nasb (Accusative):</strong> For Maf'ul and others (Fathah)</li>
                        <li>• <strong>Jarr (Genitive):</strong> After prepositions and in Idafah (Kasrah)</li>
                        <li>• <strong>Jazm (Jussive):</strong> For present tense verbs in specific cases (Sukoon)</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="sarf" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Sarf (Morphology)</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>
                      <strong>Sarf</strong> is the science that studies word structures and their transformations. It teaches you how to derive words and understand their meanings from their roots.
                    </p>
                    
                    <h3 className="text-xl text-white font-heading mt-6 mb-3">Fundamental Concepts:</h3>
                    
                    <div className="bg-black/20 p-5 rounded-xl border border-white/10 mb-4">
                      <h4 className="text-white font-heading mb-2">The Three-Letter Root (Trilateral Root)</h4>
                      <p className="text-sm font-sans">Most Arabic words come from a three-letter root.</p>
                      <p className="text-sm mt-2 font-sans">Example: Root (ك-ت-ب K-T-B) → كَتَبَ (wrote), كِتَاب (book), كَاتِب (writer), مَكْتُوب (written), مَكْتَبَة (library)</p>
                    </div>

                    <div className="bg-black/20 p-5 rounded-xl border border-white/10 mb-4">
                      <h4 className="text-white font-heading mb-2">Patterns (Awzan)</h4>
                      <p className="text-sm font-sans">Each pattern has a specific meaning added to the root meaning.</p>
                      <ul className="text-sm mt-2 space-y-1 font-sans">
                        <li>• <strong>فَاعِل (Fa'il):</strong> Active participle (doer) → كَاتِب (writer)</li>
                        <li>• <strong>مَفْعُول (Maf'ul):</strong> Passive participle (done to) → مَكْتُوب (written)</li>
                        <li>• <strong>فِعَال/فُعُول (Fi'al/Fu'ul):</strong> Plurals → كُتُب (books)</li>
                      </ul>
                    </div>

                    <div className="bg-red-accent/10 border-l-4 border-red-accent p-4 rounded-lg my-6">
                      <p className="text-white font-medium">
                        🔑 Understanding roots and patterns enables you to deduce meanings of new words without looking them up in a dictionary!
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="vocabulary" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Building Quranic Vocabulary</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>To build your Quranic vocabulary:</p>
                    <ul className="list-disc list-inside space-y-3 ml-4">
                      <li>
                        <strong>Start with most frequent words:</strong> Words like (الله، رب، قال، كان، إن، ما، لا، هو، هم، الذين) make up a large portion of the Quran.
                      </li>
                      <li>
                        <strong>Learn words in context:</strong> Memorize verses, not isolated words.
                      </li>
                      <li>
                        <strong>Use flashcards:</strong> Review 10-20 new words daily.
                      </li>
                      <li>
                        <strong>Connect words to their roots:</strong> This multiplies your vocabulary.
                      </li>
                    </ul>

                    <h3 className="text-xl text-white font-heading mt-6 mb-3">Examples of Frequently Repeated Quranic Words:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-black/30">
                            <th className="border border-white/20 p-3 text-left text-white">Word</th>
                            <th className="border border-white/20 p-3 text-left text-white">Meaning</th>
                            <th className="border border-white/20 p-3 text-left text-white">Frequency</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-white/20 p-3">الله</td>
                            <td className="border border-white/20 p-3">Allah</td>
                            <td className="border border-white/20 p-3">2600+ times</td>
                          </tr>
                          <tr className="bg-black/10">
                            <td className="border border-white/20 p-3">رب</td>
                            <td className="border border-white/20 p-3">Lord, Master</td>
                            <td className="border border-white/20 p-3">900+ times</td>
                          </tr>
                          <tr>
                            <td className="border border-white/20 p-3">قال</td>
                            <td className="border border-white/20 p-3">He said</td>
                            <td className="border border-white/20 p-3">500+ times</td>
                          </tr>
                          <tr className="bg-black/10">
                            <td className="border border-white/20 p-3">الذين</td>
                            <td className="border border-white/20 p-3">Those who</td>
                            <td className="border border-white/20 p-3">1000+ times</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="roadmap" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Learning Roadmap</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>Here's a suggested path for learning Quranic Arabic:</p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-red-accent flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                        <div className="bg-black/20 p-4 rounded-xl flex-1">
                          <h4 className="text-white font-heading">Level 1: Basic Reading (1-2 months)</h4>
                          <p className="text-sm mt-1 font-sans">Learn the alphabet, vowels, and basic reading. Start with <Link to="/explore/learntoreadquran" className="text-red-accent underline">Learn to Read Quran</Link>.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-red-accent flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                        <div className="bg-black/20 p-4 rounded-xl flex-1">
                          <h4 className="text-white font-heading">Level 2: Nahw & Sarf Fundamentals (3-6 months)</h4>
                          <p className="text-sm mt-1 font-sans">Learn nominal and verbal sentences, pronouns, past/present/command verbs.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-red-accent flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                        <div className="bg-black/20 p-4 rounded-xl flex-1">
                          <h4 className="text-white font-heading">Level 3: Expansion & Application (6-12 months)</h4>
                          <p className="text-sm mt-1 font-sans">Detailed I'rab study, morphological patterns, reading Quranic texts with analysis.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-red-accent flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                        <div className="bg-black/20 p-4 rounded-xl flex-1">
                          <h4 className="text-white font-heading">Level 4: Balagha & Tafsir (Ongoing)</h4>
                          <p className="text-sm mt-1 font-sans">Study Quranic rhetoric, read Tafsir books, independent reflection.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <section id="resources" className="mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-heading text-white mb-6">Resources & Courses</h2>
                  <div className="text-white/80 space-y-4 leading-relaxed font-sans">
                    <p>At Al Shatibi Academy, we offer a comprehensive path for learning Arabic:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><Link to="/explore/learntoreadquran" className="text-red-accent underline">Learn to Read Quran</Link> - For complete beginners</li>
                      <li><Link to="/explore/arabic" className="text-red-accent underline">Arabic Language Courses</Link> - Simplified Nahw and Sarf</li>
                      <li><Link to="/explore/quran" className="text-red-accent underline">Quran Courses</Link> - Tafsir and reflection</li>
                    </ul>
                    
                    <div className="bg-red-accent/10 border-l-4 border-red-accent p-4 rounded-lg my-6">
                      <p className="text-white font-medium">
                        🎯 The Dream program at Al Shatibi Academy offers a comprehensive curriculum proven successful with over 10,000 students.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

            </div>

            {/* CTA Section */}
            <AnimateOnScroll>
              <div className="mt-16 bg-gradient-to-br from-red-accent/20 to-black/40 rounded-2xl p-8 md:p-12 border border-red-accent/30 text-center">
                <h2 className="text-2xl md:text-3xl font-heading text-white mb-4">
                  Start Your Arabic Learning Journey Now
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto font-sans">
                  Join thousands of students who have learned Arabic and understood the Quran with Al Shatibi Academy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold text-white rounded-lg primary-btn maroon transition-all"
                  >
                    Start Your Free Trial
                  </Link>
                  <Link
                    to="/explore/arabic"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold text-white rounded-lg border border-white/30 hover:bg-white/10 transition-all"
                  >
                    Arabic Courses
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Related Articles */}
            <AnimateOnScroll>
              <div className="mt-16">
                <h3 className="text-xl font-heading text-white mb-6">Related Articles</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/articles/hifz-quran" className="bg-black/30 p-5 rounded-xl border border-white/10 hover:border-red-accent/50 transition-all group">
                    <h4 className="text-white font-heading group-hover:text-red-accent transition-colors">Quran Memorization</h4>
                    <p className="text-white/60 text-sm mt-2 font-sans">Complete guide to memorizing the Quran.</p>
                  </Link>
                  <Link to="/articles/tajweed" className="bg-black/30 p-5 rounded-xl border border-white/10 hover:border-red-accent/50 transition-all group">
                    <h4 className="text-white font-heading group-hover:text-red-accent transition-colors">Tajweed Rules</h4>
                    <p className="text-white/60 text-sm mt-2 font-sans">Learn the rules for proper Quran recitation.</p>
                  </Link>
                  <Link to="/explore/learntoreadquran" className="bg-black/30 p-5 rounded-xl border border-white/10 hover:border-red-accent/50 transition-all group">
                    <h4 className="text-white font-heading group-hover:text-red-accent transition-colors">Learn to Read Quran</h4>
                    <p className="text-white/60 text-sm mt-2 font-sans">Beginner's course in reading the Quran.</p>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </article>
    </>
  );
};

export default LearnArabic;
